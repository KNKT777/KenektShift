// Updated server.mjs - Debugging Request Issues

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';  // Importing pg package since it's CommonJS
const { Pool } = pkg;  // Destructuring Pool from the imported package
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';

import { sendSMS, send2FA } from './services/twilioService.js';
import analytics from './services/analyticsService.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import typeDefs from './graphql_gateway/schema.js';
import resolvers from './graphql_gateway/resolvers.js';


// Load environment variables
dotenv.config();

// Create a new pool for PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Verify the connection works
pool.query('SELECT NOW()')
  .then(() => console.log('Connected to PostgreSQL successfully'))
  .catch((error) => console.error('PostgreSQL connection error:', error));

const app = express();
const PORT = process.env.PORT || 5001;

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/reviews', reviewRoutes);
app.use('/billing', billingRoutes);

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'KenektShift API',
      version: '1.0.0',
      description: 'API for KenektShift Platform',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API documentation files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
});
