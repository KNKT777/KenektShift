
        import express from 'express';
        const router = express.Router();

        router.get('/v1/health', (req, res) => {
          res.status(200).json({ status: 'UP', message: 'Service is running successfully.' });
        });

        export default router;
        