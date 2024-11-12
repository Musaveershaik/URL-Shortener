const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const crypto = require('crypto');

// Generate a short ID
function generateShortId() {
    return crypto.randomBytes(4).toString('hex');
}

// GET route for the home page
router.get('/', (req, res) => {
    res.render('home');
});

// POST route for handling URL shortening
router.post('/api/shorten', async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Debug log

        if (!req.body || !req.body.originalUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        const { originalUrl } = req.body;
        
        // Validate URL
        try {
            new URL(originalUrl);
        } catch (err) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Check if URL already exists in database
        let url = await Url.findOne({ originalUrl });
        console.log('Existing URL found:', url); // Debug log
        
        if (url) {
            return res.json({
                success: true,
                originalUrl: url.originalUrl,
                shortId: url.shortId,
                shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}`,
                visits: url.visits
            });
        }

        // Create new short URL
        const shortId = generateShortId();
        url = new Url({
            originalUrl,
            shortId
        });

        console.log('Saving new URL:', url); // Debug log
        await url.save();
        console.log('URL saved successfully'); // Debug log

        res.json({
            success: true,
            originalUrl: url.originalUrl,
            shortId: url.shortId,
            shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
            visits: url.visits
        });

    } catch (error) {
        console.error('Error in /api/shorten:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Redirect route for short URLs
router.get('/:shortId', async (req, res) => {
    try {
        console.log('Accessing shortId:', req.params.shortId);
        
        const url = await Url.findOneAndUpdate(
            { shortId: req.params.shortId },
            { $inc: { visits: 1 } },  // Increment visits by 1
            { new: true }
        );
        
        console.log('Found URL:', url);
        
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        console.log('Redirecting to:', url.originalUrl);
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error in redirect:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Add a new route to get URL stats
router.get('/api/stats/:shortId', async (req, res) => {
    try {
        const url = await Url.findOne({ shortId: req.params.shortId });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.json({
            originalUrl: url.originalUrl,
            shortId: url.shortId,
            visits: url.visits,
            createdAt: url.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add this new route to get all URLs
router.get('/api/urls', async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 }); // Get latest first
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
