import rateLimit from 'express-rate-limit';

const rateLimiters = {
  admin: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Allow more requests for admins
    message: 'Too many requests from this IP, please try again later.',
    onLimitReached: (req) => {
      console.log(`Rate limit exceeded by IP: ${req.ip}, Role: ${req.user?.role || 'guest'}`);
    },
  }),
  user: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // General user limit
    message: 'Too many requests from this IP, please try again later.',
    onLimitReached: (req) => {
      console.log(`Rate limit exceeded by IP: ${req.ip}, Role: ${req.user?.role || 'guest'}`);
    },
  }),
  guest: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Lower limit for guests
    message: 'Too many requests from this IP, please try again later.',
    onLimitReached: (req) => {
      console.log(`Rate limit exceeded by IP: ${req.ip}, Role: ${req.user?.role || 'guest'}`);
    },
  }),
};

export const applyRateLimiter = (role) => {
  return rateLimiters[role] || rateLimiters['guest'];
};
