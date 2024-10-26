// Updated userRoutes.js - User Routes for CRUD Operations with Swagger Annotations

import express from 'express';
import {
  registerUser,
  loginUser,
  verify2FA,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Import the authentication middleware

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         phone:
 *           type: string
 *           description: User's phone number
 */

/**
 * @swagger
 * /v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/v1/register', registerUser);

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, 2FA code sent
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/v1/login', loginUser);

/**
 * @swagger
 * /v1/verify-2fa:
 *   post:
 *     summary: Verify the 2FA code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA verified successfully, token provided
 *       400:
 *         description: Bad Request - Invalid 2FA code
 *       500:
 *         description: Internal Server Error
 */
router.post('/v1/verify-2fa', verify2FA);

/**
 * @swagger
 * /v1/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */
router.put('/v1/profile', authenticateToken, updateUserProfile);

/**
 * @swagger
 * /v1/request-password-reset:
 *   post:
 *     summary: Request a password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset token sent to email
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/v1/request-password-reset', requestPasswordReset);

/**
 * @swagger
 * /v1/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - newPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 *       400:
 *         description: Bad Request - Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */
router.post('/v1/reset-password', resetPassword);

export default router;
