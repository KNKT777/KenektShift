
    import express from 'express';
    import pool from './config/db.js';
    import { logDataAccess } from '../../logging_service/auditLogService.js';

    const app = express();
    app.use(express.json());

    // Endpoint to start onboarding for new users
    app.post('/onboarding/start', async (req, res) => {
      const { userId, step } = req.body;
      try {
        await pool.query(
          'INSERT INTO onboarding (user_id, step, status, timestamp) VALUES ($1, $2, $3, NOW())',
          [userId, step, 'in_progress']
        );
        logDataAccess(userId, 'start_onboarding', 'onboarding', 'User started onboarding process');
        res.status(201).json({ message: 'Onboarding process started successfully' });
      } catch (error) {
        console.error('Error starting onboarding:', error);
        res.status(500).json({ error: 'Error starting onboarding' });
      }
    });

    // Endpoint to update onboarding progress
    app.put('/onboarding/update', async (req, res) => {
      const { userId, step, status } = req.body;
      try {
        await pool.query(
          'UPDATE onboarding SET step = $1, status = $2, timestamp = NOW() WHERE user_id = $3',
          [step, status, userId]
        );
        logDataAccess(userId, 'update_onboarding', 'onboarding', 'User updated onboarding progress');
        res.status(200).json({ message: 'Onboarding progress updated successfully' });
      } catch (error) {
        console.error('Error updating onboarding:', error);
        res.status(500).json({ error: 'Error updating onboarding' });
      }
    });

    const PORT = process.env.PORT || 5006;
    app.listen(PORT, () => {
      console.log(`Onboarding service running on port ${PORT}`);
    });
    