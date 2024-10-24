
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, user_type FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all job applications
const getAllApplications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM job_applications');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching job applications:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update job status (e.g., from 'open' to 'closed')
const updateJobStatus = async (req, res) => {
    const jobId = req.params.id;
    const { status } = req.body;

    try {
        const result = await pool.query('UPDATE jobs SET status = $1 WHERE id = $2 RETURNING id, title, status', [status, jobId]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating job status:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a job
const deleteJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        await pool.query('DELETE FROM jobs WHERE id = $1', [jobId]);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await pool.query('DELETE FROM users WHERE id = $1', [userId]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export { 
    getAllUsers,
    getAllJobs,
    getAllApplications,
    updateJobStatus,
    deleteJob,
    deleteUser
 };
