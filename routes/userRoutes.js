// Updated userRoutes.js

import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/userController.js';
import * as authModule from '../config/auth.js';  // Updated import for compatibility with named export

const router = express.Router();

// Register and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile update route (authenticated)
router.put('/profile', authModule.default || authModule.authenticateToken, updateUserProfile);  // Updated to handle both default and named exports

export default router;
