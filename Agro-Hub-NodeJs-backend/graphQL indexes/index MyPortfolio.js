const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection config (update with your credentials)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'testingapp', // your DB name
};

// GraphQL User type (matches your users table)
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

// Query type (you had a simple 'bye' query)
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    bye: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_parent, args) => `Good bye dear ${args.name || 'abdi'}`,
    },
  },
});

// Mutation type (createUser mutation inserts into DB)
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args) => {
        // Create MySQL connection
        const connection = await mysql.createConnection(dbConfig);

        // Run insert query with prepared statement
        const [result] = await connection.execute(
          'INSERT INTO accounts (names, emails) VALUES (?, ?)',
          [args.name, args.email]
        );

        // Close connection
        await connection.end();

        // Return the newly created user object
        return {
          id: result.insertId,
          name: args.name,
          email: args.email,
        };
      },
    },
  },
});

// Create GraphQL schema
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

// Add GraphQL endpoint with graphiql enabled
app.use('/graphql', createHandler({ schema, graphiql: true }));

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
