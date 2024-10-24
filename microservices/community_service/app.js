
    import express from 'express';
    import { Server } from 'socket.io';
    import http from 'http';
    import pool from './config/db.js';
    import Sentry from '../../config/sentry/sentryConfig.js';

    const app = express();
    app.use(Sentry.Handlers.requestHandler());
    app.use(express.json());

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    // WebSocket for real-time community chatrooms
    io.on('connection', (socket) => {
      console.log('New client connected to community chatroom');
      
      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('sendMessage', async (data) => {
        try {
          const { room, sender_id, content } = data;
          await pool.query(
            'INSERT INTO community_messages (room, sender_id, content, timestamp) VALUES ($1, $2, $3, NOW())',
            [room, sender_id, content]
          );

          // Broadcast the message to the room
          io.to(room).emit('receiveMessage', data);
        } catch (error) {
          console.error('Error storing or broadcasting community message:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected from community chatroom');
      });
    });

    const PORT = process.env.PORT || 5007;
    server.listen(PORT, () => {
      console.log(`Community service running on port ${PORT}`);
    });
    