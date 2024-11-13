const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const crypto = require('crypto');

// Generate a short ID
function generateShortId() {
    return crypto.randomBytes(4).toString('hex');
}

// POST route for shortening URLs
router.post('/api/shorten', async (req, res) => {
    try {
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

        // Check if URL already exists
        let url = await Url.findOne({ originalUrl });
        
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
            shortId,
            visits: 0
        });

        await url.save();

        res.json({
            success: true,
            originalUrl: url.originalUrl,
            shortId: url.shortId,
            shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
            visits: url.visits
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET route for URL stats
router.get('/api/urls', async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET route for specific URL stats
router.get('/api/stats/:shortId', async (req, res) => {
    try {
        const url = await Url.findOne({ shortId: req.params.shortId });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.json(url);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Redirect route
router.get('/:shortId', async (req, res) => {
    try {
        const url = await Url.findOneAndUpdate(
            { shortId: req.params.shortId },
            { $inc: { visits: 1 } },
            { new: true }
        );
        
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
