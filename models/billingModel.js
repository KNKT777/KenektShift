// Updated billingModel.js - Billing Model with PostgreSQL Queries

import { pool } from '../config/db.js';

// Function to create a new billing record
export const createBilling = async (userId, amount) => {
    const result = await pool.query(
        'INSERT INTO billing (user_id, amount) VALUES ($1, $2) RETURNING *',
        [userId, amount]
    );
    return result.rows[0];
};

// Function to get billing records for a user
export const getBillingByUser = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM billing WHERE user_id = $1',
        [userId]
    );
    return result.rows;
};

// Function to mark a billing record as paid
export const markBillingAsPaid = async (id) => {
    const result = await pool.query(
        'UPDATE billing SET status = $1 WHERE id = $2 RETURNING *',
        ['paid', id]
    );
    return result.rows[0];
};

// Function to delete a billing record
export const deleteBilling = async (id) => {
    await pool.query('DELETE FROM billing WHERE id = $1', [id]);
};
