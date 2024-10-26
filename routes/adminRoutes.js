// Updated adminRoutes.js - Admin Endpoints with ES Module Syntax

import express from 'express';

import authenticateAdmin from '../config/authAdmin.js';  // Admin authentication middleware

const router = express.Router();

// Admin endpoints
router.get('/v1/users', authenticateAdmin, getAllUsers);         // Get all users
router.get('/v1/jobs', authenticateAdmin, getAllJobs);           // Get all jobs
router.get('/v1/applications', authenticateAdmin, getAllApplications);  // Get all job applications

// Admin actions
router.put('/v1/jobs/:id/status', authenticateAdmin, updateJobStatus);  // Update job status
router.delete('/v1/jobs/:id', authenticateAdmin, deleteJob);            // Delete a job
router.delete('/v1/users/:id', authenticateAdmin, deleteUser);          // Delete a user

export default router;
