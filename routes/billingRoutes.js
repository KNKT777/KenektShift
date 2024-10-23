// routes/billingRoutes.js - Billing Routes for User Payments with Logging and Swagger Documentation

const express = require('express');
const Billing = require('../models/billingModel');
const router = express.Router();
const logger = require('../services/logger'); // Winston logger service

/**
 * @swagger
 * components:
 *   schemas:
 *     Billing:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         amount:
 *           type: number
 *           description: The billing amount
 *         status:
 *           type: string
 *           description: The status of the billing (pending/paid)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the billing record was created
 *         transactionId:
 *           type: string
 *           description: The transaction ID
 */

/**
 * @swagger
 * /billing:
 *   post:
 *     summary: Create a new billing entry
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Billing'
 *     responses:
 *       201:
 *         description: The billing entry was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Billing'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const newBilling = await Billing.create({ userId, amount });
        logger.info(`Billing entry created for user ${userId}, amount: ${amount}`);
        res.status(201).json(newBilling);
    } catch (error) {
        logger.error(`Error creating billing entry: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /billing/user/{userId}:
 *   get:
 *     summary: Get billing history for a user
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The billing history for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Billing'
 *       500:
 *         description: Some server error
 */
router.get('/user/:userId', async (req, res) => {
    try {
        const billingRecords = await Billing.find({ userId: req.params.userId });
        logger.info(`Billing history retrieved for user ${req.params.userId}`);
        res.status(200).json(billingRecords);
    } catch (error) {
        logger.error(`Error retrieving billing history: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /billing/{id}/pay:
 *   put:
 *     summary: Mark a billing record as paid
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the billing record
 *     responses:
 *       200:
 *         description: The billing record was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Billing'
 *       500:
 *         description: Some server error
 */
router.put('/:id/pay', async (req, res) => {
    try {
        const billingRecord = await Billing.findByIdAndUpdate(req.params.id, { status: 'paid' }, { new: true });
        logger.info(`Billing record ${req.params.id} marked as paid`);
        res.status(200).json(billingRecord);
    } catch (error) {
        logger.error(`Error marking billing record as paid: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /billing/{id}:
 *   delete:
 *     summary: Delete a billing record
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the billing record
 *     responses:
 *       200:
 *         description: The billing record was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/:id', async (req, res) => {
    try {
        await Billing.findByIdAndDelete(req.params.id);
        logger.info(`Billing record ${req.params.id} deleted`);
        res.status(200).json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting billing record: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
