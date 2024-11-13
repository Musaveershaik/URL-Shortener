const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    // Get token from session or header
    const token = req.session.token || req.headers.authorization;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'your-secret-key'); // Use environment variable in production
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/login');
    }
};

module.exports = isAuthenticated; 