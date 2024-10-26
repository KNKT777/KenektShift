// Updated jobRoutes.js - Job Routes with ES Module Syntax

import express from 'express';
import { getAllJobs, postJob, updateJob, deleteJob } from '../controllers/jobController.js';
import authenticateToken from '../config/auth.js';

const router = express.Router();

// Job routes
router.get('/v1/', authenticateToken, getAllJobs);      // Get all jobs
router.post('/v1/', authenticateToken, postJob);     // Create a new job
router.put('/v1/:id', authenticateToken, updateJob);   // Update an existing job
router.delete('/v1/:id', authenticateToken, deleteJob);  // Delete a job

export default router;
