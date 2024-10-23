// Updated jobRoutes.js - Job Routes with ES Module Syntax

import express from 'express';
import { getAllJobs, postJob, updateJob, deleteJob } from '../controllers/jobController.js';
import authenticateToken from '../config/auth.js';

const router = express.Router();

// Job routes
router.get('/', authenticateToken, getAllJobs);      // Get all jobs
router.post('/', authenticateToken, postJob);     // Create a new job
router.put('/:id', authenticateToken, updateJob);   // Update an existing job
router.delete('/:id', authenticateToken, deleteJob);  // Delete a job

export default router;
