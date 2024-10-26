// Auth service for user authentication
import logger from '../config/logger.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('Invalid token');
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  });
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      logger.warn('Access denied for user: ' + (req.user ? req.user.id : 'unknown') + '; Required role: ' + role);
      return res.status(403).json({ message: 'Access denied: insufficient permissions.' });
    }
    logger.info('User: ' + req.user.id + ' granted access with role: ' + role);
    next();
  };
}

// Updated to provide named exports for both functions
export { authenticateToken, requireRole };
