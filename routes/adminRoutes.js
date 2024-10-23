// Updated adminRoutes.js - Admin Endpoints with ES Module Syntax

import express from 'express';
import { getAllUsers, getAllJobs, getAllApplications, updateJobStatus, deleteJob, deleteUser } from '../controllers/adminController.js';
import authenticateAdmin from '../config/authAdmin.js';  // Admin authentication middleware

const router = express.Router();

// Admin endpoints
router.get('/users', authenticateAdmin, getAllUsers);         // Get all users
router.get('/jobs', authenticateAdmin, getAllJobs);           // Get all jobs
router.get('/applications', authenticateAdmin, getAllApplications);  // Get all job applications

// Admin actions
router.put('/jobs/:id/status', authenticateAdmin, updateJobStatus);  // Update job status
router.delete('/jobs/:id', authenticateAdmin, deleteJob);            // Delete a job
router.delete('/users/:id', authenticateAdmin, deleteUser);          // Delete a user

export default router;
