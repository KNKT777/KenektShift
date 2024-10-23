const express = require('express');
const router = express.Router();
const logger = require('../services/logger');
const { createBilling, getBillingByUser, markBillingAsPaid, deleteBilling } = require('../models/billingModel');

// Create a new billing entry
router.post('/', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const newBilling = await createBilling(userId, amount);
        logger.info(`Billing entry created for user ${userId}, amount: ${amount}`);
        res.status(201).json(newBilling);
    } catch (error) {
        logger.error(`Error creating billing entry: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get billing history for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const billingRecords = await getBillingByUser(req.params.userId);
        logger.info(`Billing history retrieved for user ${req.params.userId}`);
        res.status(200).json(billingRecords);
    } catch (error) {
        logger.error(`Error retrieving billing history: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Mark a billing record as paid
router.put('/:id/pay', async (req, res) => {
    try {
        const billingRecord = await markBillingAsPaid(req.params.id);
        logger.info(`Billing record ${req.params.id} marked as paid`);
        res.status(200).json(billingRecord);
    } catch (error) {
        logger.error(`Error marking billing record as paid: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Delete a billing record
router.delete('/:id', async (req, res) => {
    try {
        await deleteBilling(req.params.id);
        logger.info(`Billing record ${req.params.id} deleted`);
        res.status(200).json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting billing record: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
