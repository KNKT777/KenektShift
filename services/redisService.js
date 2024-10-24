
    import redis from 'redis';

    const client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: 6379,
    });

    client.on('error', (err) => {
      console.error('Redis error:', err);
    });

    export const setCache = (key, value, expiry = 3600) => {
      client.set(key, JSON.stringify(value), 'EX', expiry);
    };

    export const getCache = (key) => {
      return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
          if (err) {
            return reject(err);
          }
          if (data) {
            return resolve(JSON.parse(data));
          }
          resolve(null);
        });
      });
    };

    export default client;
    