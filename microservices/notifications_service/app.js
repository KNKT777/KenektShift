
    import express from 'express';
    import pool from './config/db.js';
    import { logDataAccess } from '../../logging_service/auditLogService.js';

    const app = express();
    app.use(express.json());

    // Endpoint to create a notification
    app.post('/notifications', async (req, res) => {
      const { userId, type, content } = req.body;
      try {
        await pool.query(
          'INSERT INTO notifications (user_id, type, content, status, timestamp) VALUES ($1, $2, $3, $4, NOW())',
          [userId, type, content, 'unread']
        );
        logDataAccess(userId, 'create_notification', 'notification', 'Notification created for user');
        res.status(201).json({ message: 'Notification created successfully' });
      } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Error creating notification' });
      }
    });

    // Endpoint to get notifications for a user
    app.get('/notifications/:userId', async (req, res) => {
      const userId = req.params.userId;
      try {
        const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
        logDataAccess(userId, 'view_notifications', 'notification', 'User accessed notifications');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).json({ error: 'Error retrieving notifications' });
      }
    });

    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => {
      console.log(`Notifications service running on port ${PORT}`);
    });
    