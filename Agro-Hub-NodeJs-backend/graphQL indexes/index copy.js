// index.js
import express from 'express';                          
import cors from 'cors';                                
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { graphqlHTTP } from 'express-graphql'; // ✅ CHANGED: Switched from graphql-http
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } from 'graphql';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { fileURLToPath } from 'url';                  

// ESM-compatible __dirname workaround
const __filename = fileURLToPath(import.meta.url);    
const __dirname = path.dirname(__filename);            

// App setup
const app = express();
app.use(cors({
   origin: "http://localhost:5173",
   methods: ["POST", "GET"],
   credentials: true,
}));
app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 })); // ✅ Unchanged

// MySQL config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "agrohub"
};

// GraphQL response type
const frontEndRes = new GraphQLObjectType({
  name: "frontEndRes",
  fields: {
    message: { type: GraphQLString }
  }
});

// GraphQL Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    uploadCrop: {
      type: frontEndRes,
      args: {
        sellerID: { type: GraphQLInt },
        cropName: { type: GraphQLString },
        unit: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        minimumSellableQuantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
        photo: { type: GraphQLUpload },
      },
      resolve: async (parent, args) => {
        const {
          sellerID,
          cropName,
          unit,
          quantity,
          minimumSellableQuantity,
          price,
          photo
        } = args;

        const file = await photo;
        const stream = file.createReadStream();
        const filename = file.filename;

        const savePath = path.join(__dirname, 'uploads', filename);

        const writeStream = fs.createWriteStream(savePath);
        stream.pipe(writeStream);

        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        try {
          const connection = await mysql.createConnection(dbConfig);
          const query = `
            INSERT INTO crops 
            (sellerID, cropName, unit, quantity, minimumSellableQuantity, price, photo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          await connection.execute(query, [
            sellerID,
            cropName,
            unit,
            quantity,
            minimumSellableQuantity,
            price,
            filename
          ]);
          await connection.end();
          return { message: "Crop uploaded successfully!" };
        } catch (err) {
          console.error("Error saving to database:", err);
          return { message: "Error saving crop." };
        }
      }
    }
  }
});

// GraphQL schema
const schema = new GraphQLSchema({ mutation });

// ✅ CHANGED: Using graphqlHTTP from express-graphql
app.use('/uploadCrop', graphqlHTTP({
  schema,
  graphiql: true, // You can set to false in production
}));

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
