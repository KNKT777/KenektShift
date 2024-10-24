
import logger from '../services/logger.js';

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      logger.warn(\`Access denied for user: \${req.user ? req.user.id : 'unknown'}; Required role: \${role}\`);
      return res.status(403).json({ message: 'Access denied: insufficient permissions.' });
    }
    logger.info(\`User: \${req.user.id} granted access with role: \${role}\`);
    next();
  };
}

export { requireRole };
