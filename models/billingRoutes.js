// routes/billingRoutes.js - Billing Routes for User Payments

const express = require('express');
const Billing = require('../models/billingModel');
const router = express.Router();

// Create a new billing entry
router.post('/', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const newBilling = await Billing.create({ userId, amount });
        res.status(201).json(newBilling);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get billing history for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const billingRecords = await Billing.find({ userId: req.params.userId });
        res.status(200).json(billingRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark a billing record as paid
router.put('/:id/pay', async (req, res) => {
    try {
        const billingRecord = await Billing.findByIdAndUpdate(req.params.id, { status: 'paid' }, { new: true });
        res.status(200).json(billingRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a billing record
router.delete('/:id', async (req, res) => {
    try {
        await Billing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
