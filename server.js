const express = require('express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100  // Limit each IP to 100 requests per window
});
app.use(limiter);

// Import your routes
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');  // Add this line to import user routes

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);  // Add this line to use user routes

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
