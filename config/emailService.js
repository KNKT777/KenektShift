// emailService.js - Email Service for Sending General Emails

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter using your email credentials (Titan email)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send generic email
export const sendEmail = async (to, subject, body) => {
    const mailOptions = {
        from: `"KenektShift Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (to, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendEmail(to, 'Password Reset Request', `
        <p>You requested a password reset. Please use the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
    `);
};
