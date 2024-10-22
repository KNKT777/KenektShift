const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const { pool } = require('../config/db');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, user_type } = req.body;

    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, password_hash, user_type);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Log in an existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ user_id: user.id, email: user.email, user_type: user.user_type }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token, user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
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

// Export all functions in a single module.exports
module.exports = { registerUser, loginUser, updateUserProfile };
