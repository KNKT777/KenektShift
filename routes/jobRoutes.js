// Updated jobRoutes.js - Job Routes with ES Module Syntax

import express from 'express';
import { getAllJobs, postJob, updateJob, deleteJob, expireJobs, notifyJobExpiring, applyForJob, getFilteredJobs, getUserApplications, updateApplicationStatus, getAllApplications } from '../controllers/jobController.js';
import authenticateToken from '../config/auth.js';

const router = express.Router();

// Job routes
router.get('/v1/', authenticateToken, getAllJobs);      // Get all jobs
router.post('/v1/', authenticateToken, postJob);     // Create a new job
router.put('/v1/:id', authenticateToken, updateJob);   // Update an existing job
router.delete('/v1/:id', authenticateToken, deleteJob);  // Delete a job
router.post('/v1/apply/:id', authenticateToken, applyForJob);  // Apply for a job
router.get('/v1/applications', authenticateToken, getUserApplications); // Get user's job applications
router.get('/v1/filter', authenticateToken, getFilteredJobs); // Get filtered jobs
router.put('/v1/applications/:id', authenticateToken, updateApplicationStatus); // Update job application status
router.get('/v1/admin/applications', authenticateToken, getAllApplications); // Get all applications for admin

export default router;
