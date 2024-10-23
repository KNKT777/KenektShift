// Updated server.js - Migrated to PostgreSQL

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const twilio = require('./services/twilioService');
const analytics = require('./services/analyticsService');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const billingRoutes = require('./routes/billingRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 5001;

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

// Twilio Integration Example
app.post('/send-sms', (req, res) => {
    const { message, to } = req.body;
    twilio.sendSMS(to, message)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

// 2FA Endpoint
app.post('/send-2fa', (req, res) => {
    const { to, code } = req.body;
    twilio.send2FA(to, code)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

// Analytics Example
app.post('/track-event', (req, res) => {
    const { event, userId } = req.body;
    analytics.trackEvent(event, userId)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
