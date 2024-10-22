const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const authenticateToken = require('../config/auth');  // Middleware to ensure authentication

const router = express.Router();

// Register and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile update route
router.put('/profile', authenticateToken, updateUserProfile);  // PUT request to update profile


// Update user profile (authenticated)
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;
