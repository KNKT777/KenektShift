import jwt from 'jsonwebtoken';

const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }

        // Check if the user is an admin
        if (decoded.user_type !== 'admin') {
            return res.status(403).json({ error: 'Not authorized as admin' });
        }

        req.user = decoded;  // Save the decoded token to the request for further use
        next();
    });
};

export default authenticateAdmin;
