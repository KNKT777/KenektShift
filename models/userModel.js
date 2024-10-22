const { pool } = require('../config/db');

// Create a new user
const createUser = async (name, email, password_hash, user_type) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password_hash, user_type) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_type',
        [name, email, password_hash, user_type]
    );
    return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };