import express from 'express';

    import client from './redisService.js';

    export const rateLimitMiddleware = (req, res, next) => {
      const user = req.user; // Assuming user info is available from authentication middleware
      const userTier = user.subscriptionTier || 'free';
      const requestLimit = userTier === 'premium' ? 500 : 100; // Differentiated rate limits

      const key = `rate-limit:${user.id}`;
      client.get(key, (err, count) => {
        if (err) {
          console.error('Rate limit error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (count && parseInt(count) >= requestLimit) {
          return res.status(429).json({ message: 'Rate limit exceeded' });
        }

        client.incr(key);
        client.expire(key, 60 * 15); // Rate limit period of 15 minutes
        next();
      });
    };
    