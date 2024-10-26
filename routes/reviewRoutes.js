// Updated reviewRoutes.js - Review Routes for SQL Integration

import express from 'express';
import pool from '../config/db'; // Assuming the database pool is imported from this path

const router = express.Router();

// Create a new review
router.post('/v1/', async (req, res) => {
    const { userId, rating, comment, jobId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO reviews (user_id, rating, comment, job_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [userId, rating, comment, jobId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews for a job
router.get('/v1/job/:jobId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE job_id = $1',
            [req.params.jobId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all reviews for a user
router.get('/v1/user/:userId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE user_id = $1',
            [req.params.userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review
router.put('/v1/:id', async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const result = await pool.query(
            'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
            [rating, comment, req.params.id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a review
router.delete('/v1/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM reviews WHERE id = $1', [req.params.id]);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
