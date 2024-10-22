const express = require('express');
const authenticateToken = require('../config/auth');
const {
    postJob,
    getOpenJobs,
    applyForJob,
    getFilteredJobs,
    getUserApplications,
    updateApplicationStatus,  // Ensure it's imported here
    getAllJobs,
    getAllApplications
} = require('../controllers/jobController');

const router = express.Router();

// Route to post a new job
router.post('/', authenticateToken, postJob);

// Route to get all open jobs
router.get('/', getOpenJobs);

// Route to apply for a job
router.post('/:id/apply', authenticateToken, applyForJob);

// Route to search and filter jobs
router.get('/search', getFilteredJobs);

// Route to get all job applications by the user
router.get('/applications', authenticateToken, getUserApplications);

// Route to update job application status
router.put('/applications/:id/status', authenticateToken, updateApplicationStatus);  // Ensure it's being used here

// Admin routes
router.get('/admin/jobs', authenticateToken, getAllJobs);
router.get('/admin/applications', authenticateToken, getAllApplications);

module.exports = router;
