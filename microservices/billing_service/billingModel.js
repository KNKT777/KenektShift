// Updated billingModel.js - Billing Model with PostgreSQL Queries

import { pool } from '../config/db.js';

// Function to create a new billing record
export const createBilling = async (userId, amount) => {
    try {
        const result = await pool.query(
            'INSERT INTO billing (user_id, amount) VALUES ($1, $2) RETURNING *',
            [userId, amount]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Function to get billing records for a user
export const getBillingByUser = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM billing WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Function to mark a billing record as paid
export const markBillingAsPaid = async (id) => {
    try {
        const result = await pool.query(
            'UPDATE billing SET status = $1 WHERE id = $2 RETURNING *',
            ['paid', id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Function to delete a billing record
export const deleteBilling = async (id) => {
    try {
        await pool.query('DELETE FROM billing WHERE id = $1', [id]);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
