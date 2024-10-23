const express = require('express');
const { getAllUsers, getAllJobs, getAllApplications, updateJobStatus, deleteJob, deleteUser } = require('../controllers/adminController');
const authenticateAdmin = require('../config/authAdmin');  // Admin authentication middleware

const router = express.Router();

// Admin endpoints
router.get('/users', authenticateAdmin, getAllUsers);         // Get all users
router.get('/jobs', authenticateAdmin, getAllJobs);           // Get all jobs
router.get('/applications', authenticateAdmin, getAllApplications);  // Get all job applications

// Admin actions
router.put('/jobs/:id/status', authenticateAdmin, updateJobStatus);  // Update job status
router.delete('/jobs/:id', authenticateAdmin, deleteJob);            // Delete a job
router.delete('/users/:id', authenticateAdmin, deleteUser);          // Delete a user

module.exports = router;
