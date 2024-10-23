// routes/reviewRoutes.js - Review Routes for CRUD Operations

const express = require('express');
const Review = require('../models/reviewModel');
const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
    const { userId, rating, comment, jobId } = req.body;
    try {
        const newReview = await Review.create({ userId, rating, comment, jobId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews for a job
router.get('/job/:jobId', async (req, res) => {
    try {
        const reviews = await Review.find({ jobId: req.params.jobId }).populate('userId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all reviews for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId }).populate('jobId', 'title');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review
router.put('/:id', async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { rating, comment }, { new: true });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
