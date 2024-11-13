const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth.middleware');

// Public routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// Protected route - only accessible if authenticated
router.get('/', isAuthenticated, (req, res) => {
    res.render('home');
});

module.exports = router;

