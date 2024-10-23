// models/billingModel.js - Billing Model for User Payments

const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    transactionId: { type: String }
});

module.exports = mongoose.model('Billing', billingSchema);
