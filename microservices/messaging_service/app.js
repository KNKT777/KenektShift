import { logDataAccess } from '../../logging_service/auditLogService.js';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import express from 'express';
import { sendSMSNotification } from './utils/notificationUtils.js';
import { Server } from 'socket.io';
import http from 'http';
import { pool } from './config/db.js';
import { encrypt, decrypt } from './utils/cryptoUtils.js';
import Sentry from '../../config/sentry/sentryConfig.js';

const app = express();

const messageRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use('/messages', messageRateLimiter);
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// WebSocket for real-time messaging
io.on('connection', (socket) => {
  console.log('New client connected for messaging');

  socket.on('authenticate', (token) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT authentication failed:', err);
        socket.disconnect();
      } else {
        socket.user = decoded;
        console.log('User authenticated for WebSocket:', socket.user.id);
      }
    });
  });

  socket.on('sendMessage', async (data) => {
    // Authorization check to verify sender's identity
    if (data.sender_id !== socket.user.id) {
      return socket.emit('error', { error: 'Unauthorized message sender' });
    }
    try {
      const { sender_id, receiver_id, content } catch (error) {
  console.error(error);
} = data;
      const encryptedContent = encrypt(content);

      // Store the message in the database
      await pool.query(
        'INSERT INTO messages (sender_id, receiver_id, content, status) VALUES ($1, $2, $3, $4)',
        [sender_id, receiver_id, encryptedContent, 'unread']
      );

      // Broadcast the message to the receiver
      io.emit(`receiveMessage_${receiver_id}`, data);
    } catch (error) {
      console.error('Error storing or broadcasting message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from messaging');
  });
});

// REST API for retrieving message history
app.get('/messages/:userId', async (req, res) => {
  logDataAccess(req.user.id, 'view_messages', 'messages', 'User accessed message history');

  // Authorization check to ensure the user can only access their messages
  if (req.user.id != req.params.userId) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const userId = req.params.userId;
    const result = await pool.query(
      'SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY timestamp',
      [userId]
    );

    const messages = result.rows.map((message) => ({
      ...message,
      content: decrypt(message.content),
    } catch (error) {
  console.error(error);
}));

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Error retrieving messages' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Messaging service is up and running' });
});

app.post('/messages/:messageId/read', async (req, res) => {
  try {
    const messageId = req.params.messageId;
    await pool.query('UPDATE messages SET status = $1 WHERE id = $2', ['read', messageId]);
    res.status(200).json({ status: 'Message marked as read' } catch (error) {
  console.error(error);
});
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Error updating message status' });
  }
});

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 5004;
server.listen(PORT, () => {
  console.log(`Messaging service running on port ${PORT}`);
});
