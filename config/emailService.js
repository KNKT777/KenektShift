const nodemailer = require('nodemailer');

// Add console logs to check if environment variables are loaded
console.log('EMAIL_USER:', process.env.EMAIL_USER);  // Should print your email user
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);  // Should print your email password

// Create a transporter for sending emails using Titan's SMTP server
const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',   // Titan SMTP server
    port: 587,                  // SMTP port for TLS
    secure: false,              // Use TLS
    auth: {
        user: process.env.EMAIL_USER,  // Your Titan email address
        pass: process.env.EMAIL_PASS   // Your Titan email password
    },
    tls: {
        rejectUnauthorized: false  // Allow self-signed certificates if needed
    }
});

// Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Your email address (set in .env)
        to: 'kenektshift@kenektcare.com',  // Replace with the actual recipient email
        subject,                          // Subject of the email
        text                              // Body of the email
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


module.exports = { sendEmail };
