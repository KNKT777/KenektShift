// Updated userController.js

import { send2FA } from '../services/twilioService.js';  // Updated import name to match export
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { pool } from '../config/db.js';

// Generate a 6-digit 2FA code
const generate2FACode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit code
};

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, user_type, phone } = req.body;

    // Ensure phone is part of the required fields
    if (!name || !email || !password || !user_type || !phone) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);

        // Insert user into the database with the phone number
        const user = await pool.query(
            'INSERT INTO users (name, email, password_hash, user_type, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone',
            [name, email, password_hash, user_type, phone]
        );

        res.status(201).json(user.rows[0]);  // Return the newly created user data
    } catch (err) {
        console.error('Error during registration:', err);

        // Check if the error is related to a duplicate email
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        res.status(500).json({ error: 'Server error' });
    }
};

// Log in an existing user and send 2FA code
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate a 2FA code
        const twoFACode = generate2FACode();

        // Send 2FA code to user's phone number
        await send2FA(user.phone, twoFACode);

        // Store the 2FA code temporarily in the database
        await pool.query('UPDATE users SET twofa_code = $1 WHERE email = $2', [twoFACode, email]);

        res.status(200).json({
            message: '2FA code sent to your phone. Please verify to complete login.'
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Verify the 2FA code and complete login
export const verify2FA = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ error: 'Please provide email and 2FA code' });
    }

    try {
        const result = await pool.query('SELECT id, email, twofa_code FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || user.twofa_code !== code) {
            return res.status(400).json({ error: 'Invalid 2FA code' });
        }

        // Once the 2FA code is verified, generate the JWT token
        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Clear the 2FA code after verification
        await pool.query('UPDATE users SET twofa_code = NULL WHERE email = $1', [email]);

        res.status(200).json({
            token,
            message: '2FA verified successfully. Here is your token.',
        });
    } catch (err) {
        console.error('2FA verification error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const { name, profile_picture, phone } = req.body;
    const user_id = req.user.user_id;  // Extract user ID from the authenticated token

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, profile_picture = $2, phone = $3 WHERE id = $4 RETURNING id, name, email, profile_picture, phone',
            [name, profile_picture, phone, user_id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
