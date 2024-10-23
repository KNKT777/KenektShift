// Updated server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';
// import * as twilio from './services/twilioService.js'; // Disabled Twilio import due to missing setup
import analytics from './services/analyticsService.js'; // Use Option 1 if default export
// OR
import { trackEvent } from './services/analyticsService.js'; // Use Option 2 if named export
import * as userRoutes from './routes/userRoutes.js';
import * as jobRoutes from './routes/jobRoutes.js';
import * as reviewRoutes from './routes/reviewRoutes.js';
import * as billingRoutes from './routes/billingRoutes.js'; // Updated import statement for named export compatibility
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes.default || userRoutes);
app.use('/jobs', jobRoutes.default || jobRoutes);
app.use('/reviews', reviewRoutes.default || reviewRoutes);
app.use('/billing', billingRoutes.default || billingRoutes); // Updated to handle both default and named exports

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KenektShift API',
            version: '1.0.0',
            description: 'API for KenektShift Platform',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your API documentation files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((error) => console.error('PostgreSQL connection error:', error));

// Twilio Integration Example (Disabled temporarily due to missing Twilio setup)
// app.post('/send-sms', (req, res) => {
//     const { message, to } = req.body;
//     twilio.sendSMS(to, message)
//         .then(response => res.status(200).send(response))
//         .catch(error => {
//             console.error('Error sending SMS:', error);
//             res.status(500).send(error);
//         });
// });

// 2FA Endpoint (Disabled temporarily due to missing Twilio setup)
// app.post('/send-2fa', (req, res) => {
//     const { to, code } = req.body;
//     twilio.send2FA(to, code)
//         .then(response => res.status(200).send(response))
//         .catch(error => {
//             console.error('Error sending 2FA code:', error);
//             res.status(500).send(error);
//         });
// });

// Analytics Example
app.post('/track-event', (req, res) => {
    const { event, userId } = req.body;
    analytics.trackEvent(event, userId) // Use if default export
    // OR
    // trackEvent(event, userId) // Use if named export
        .then(response => res.status(200).send(response))
        .catch(error => {
            console.error('Error tracking event:', error);
            res.status(500).send(error);
        });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
