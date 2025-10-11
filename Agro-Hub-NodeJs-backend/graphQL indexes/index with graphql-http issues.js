import express from 'express';                          
import cors from 'cors';                                
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { createHandler } from 'graphql-http/lib/use/express.js';  
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload'; 
import { fileURLToPath } from 'url';                  

//ESM-compatible __dirname workaround
const __filename = fileURLToPath(import.meta.url);    
const __dirname = path.dirname(__filename);            

const app = express();
app.use(cors({
   origin: "http://localhost:5173",
   methods: ["POST",'GET'],
   credentials: true,
}));

const dbConfig={
  host:"localhost",
  user:"root",
  password:"",
  database:"agrohub"
}

const frontEndRes = new GraphQLObjectType({
  name:"frontEndRes",
  fields:{
    message:{ type : GraphQLString}
  }
});

const mutation = new GraphQLObjectType({
  name:"addCrop",
  fields:{
    uploadCrop:{
      type: frontEndRes,
      args:{
        sellerID:{type: GraphQLInt},
        cropName:{type: GraphQLString},
        unit:{type: GraphQLString},
        quantity:{type: GraphQLInt},
        minimumSellableQuantity:{type: GraphQLInt},
        price:{type: GraphQLInt},
        photo: GraphQLUpload,
      },
      resolve: async (parent, args)=>{
        //destructuring args to obtain variables recieved frm front-end 
        const {
          sellerID,
          cropName,
          unit,
          quantity,
          minimumSellableQuantity,
          price,
          photo
        } = args;

        // Get file info
        const file = await photo;
        const stream = file.createReadStream();
        const filename = file.filename;

        const savePath = path.join(__dirname, 'uploads', filename);

        // Save the file
        const writeStream = fs.createWriteStream(savePath);
        stream.pipe(writeStream);

        //make sure that file is uploaded successful before moving on
        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        // Save data to MySQL
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
        } 
        catch (err) {
          console.log("Error saving to database:", err);
          return { message: "Error saving crop." };
        };

      }
    }
  }
});

const schema = new GraphQLSchema({
  mutation,
});

app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

app.use('/uploadCrop', createHandler({schema}));
const PORT = 4000;
app.listen(PORT, ()=>{
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
