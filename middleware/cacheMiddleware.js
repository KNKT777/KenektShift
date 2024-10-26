import express from 'express';

    import redis from 'redis';
    import { promisify } from 'util';

    const redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

    const getAsync = promisify(redisClient.get).bind(redisClient);
    const setAsync = promisify(redisClient.set).bind(redisClient);

    export const cacheMiddleware = async (req, res, next) => {
      const key = req.originalUrl;
      try {
        const cachedData = await getAsync(key);
        if (cachedData) {
          return res.status(200).json(JSON.parse(cachedData));
        } catch (error) {
  console.error(error);
}
        res.sendResponse = res.send;
        res.send = async (body) => {
          await setAsync(key, JSON.stringify(body), 'EX', 60 * 5); // Cache for 5 minutes
          res.sendResponse(body);
        };
        next();
      } catch (error) {
        console.error('Cache middleware error:', error);
        next();
      }
    };
    