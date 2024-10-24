import { body, validationResult } from 'express-validator';
// Updated jobController.js - Job Controller with ES Module Syntax


// Auto-close jobs after 30 days
export const expireJobs = async () => {
    try {
        const result = await pool.query(
            "UPDATE jobs SET status = 'closed' WHERE status = 'open' AND created_at < NOW() - INTERVAL '30 days' RETURNING id, title, status"
        );

        result.rows.forEach(job => {
            sendEmail(
                'admin@example.com',
                'Job Auto-Closed',
                `Your job titled "${job.title}" has been automatically closed due to inactivity.`
            );
        });

        console.log(`Auto-closed ${result.rowCount} jobs.`);
    } catch (err) {
        console.error('Error auto-closing jobs:', err);
    }
};

// Notify job posters when jobs are nearing expiration (e.g., 5 days before expiration)
export const notifyJobExpiring = async () => {
    try {
        const result = await pool.query(
            "SELECT id, title FROM jobs WHERE status = 'open' AND created_at < NOW() - INTERVAL '25 days'"
        );

        result.rows.forEach(job => {
            sendEmail(
                'admin@example.com',
                'Job Expiring Soon',
                `Your job titled "${job.title}" will expire in 5 days. Please take action if necessary.`
            );
        });

        console.log(`Sent expiration warnings for ${result.rowCount} jobs.`);
    } catch (err) {
        console.error('Error sending expiration warnings:', err);
    }
};

// Schedule task to auto-close jobs every day at midnight
cron.schedule('0 0 * * *', () => {
    expireJobs();
});

// Post a new job
export const postJob = async (req, res) => {
    const { title, description, location, hours, job_type, hourly_rate } = req.body;
    const user_id = req.user.user_id;

    if (!user_id || !title || !description || !location || !hours || !job_type || !hourly_rate) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO jobs (user_id, title, description, location, hours, job_type, hourly_rate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, description, location, hours, job_type, hourly_rate, status, created_at',
            [user_id, title, description, location, hours, job_type, hourly_rate]
        );

        sendEmail(
            'admin@example.com',
            'New Job Posted',
            `A new job titled "${title}" has been posted in ${location}.`
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error posting job:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a job
export const updateJob = async (req, res) => {
    const job_id = req.params.id;
    const { title, description, location, hours, job_type, hourly_rate, status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE jobs SET title = $1, description = $2, location = $3, hours = $4, job_type = $5, hourly_rate = $6, status = $7 WHERE id = $8 RETURNING *',
            [title, description, location, hours, job_type, hourly_rate, status, job_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get jobs with pagination
export const getOpenJobs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await pool.query(
            'SELECT * FROM jobs WHERE status = $1 LIMIT $2 OFFSET $3',
            ['open', limit, offset]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching paginated jobs:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Apply for a job
export const applyForJob = async (req, res) => {
    const job_id = req.params.id;
    const user_id = req.user.user_id;

    try {
        const result = await pool.query(
            'INSERT INTO job_applications (job_id, user_id) VALUES ($1, $2) RETURNING id, status, applied_at',
            [job_id, user_id]
        );

        sendEmail(
            'admin@example.com',
            'New Job Application',
            `A new application has been submitted for Job ID: ${job_id}.`
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error applying for job:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Search and filter jobs (with hourly pay filter)
export const getFilteredJobs = async (req, res) => {
    const { location, hours, job_type, minPay, maxPay } = req.query;

    let query = 'SELECT * FROM jobs WHERE status = $1';
    let params = ['open'];

    if (location) {
        query += ' AND location = $2';
        params.push(location);
    }
    if (hours) {
        query += ' AND hours = $3';
        params.push(hours);
    }
    if (job_type) {
        query += ' AND job_type = $4';
        params.push(job_type);
    }
    if (minPay) {
        query += ' AND hourly_rate >= $5';
        params.push(minPay);
    }
    if (maxPay) {
        query += ' AND hourly_rate <= $6';
        params.push(maxPay);
    }

    try {
        const result = await pool.query(query, params);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error searching jobs:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get user job applications
export const getUserApplications = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const result = await pool.query(
            'SELECT jobs.title, jobs.description, job_applications.status, job_applications.applied_at FROM job_applications JOIN jobs ON job_applications.job_id = jobs.id WHERE job_applications.user_id = $1',
            [user_id]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching job applications:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update job application status
export const updateApplicationStatus = async (req, res) => {
    const application_id = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Please provide a valid status' });
    }

    try {
        const result = await pool.query(
            'UPDATE job_applications SET status = $1 WHERE id = $2 RETURNING id, status, applied_at',
            [status, application_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        sendEmail(
            'user@example.com',  // Replace with the actual user's email
            'Job Application Status Updated',
            `Your job application has been updated to: ${status}.`
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating job application status:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all jobs for admin
export const getAllJobs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching all jobs for admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all job applications for admin
export const getAllApplications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM job_applications');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching all applications for admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    const job_id = req.params.id;

    try {
        const result = await pool.query(
            'DELETE FROM jobs WHERE id = $1 RETURNING *',
            [job_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


// Input validation middleware
const validateJob = [
  body('title').isString().withMessage('Title must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
