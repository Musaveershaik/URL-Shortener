const express = require('express');
const router = express.Router();
const Url = require('../models/url.model');

router.get('/', (req, res) => {
    res.render('home');
});

router.post('/api/shorten', async (req, res) => {
    try {
        const { url } = req.body;
        
        // More thorough URL validation
        if (!url || !url.trim()) {
            return res.status(400).json({ error: 'Please provide a URL' });
        }

        // Ensure URL has http:// or https:// prefix
        let validUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            validUrl = 'https://' + url;
        }

        try {
            new URL(validUrl);
        } catch (err) {
            return res.status(400).json({ error: 'Please provide a valid URL' });
        }

        // Check if URL already exists
        let urlDoc = await Url.findOne({ originalUrl: validUrl });
        
        if (urlDoc) {
            return res.json({ shortUrl: urlDoc.shortUrl });
        }

        // Create new URL document
        const shortUrl = generateShortUrl(); // Your existing function
        urlDoc = new Url({
            originalUrl: validUrl,
            shortUrl,
            createdAt: new Date()
        });

        await urlDoc.save();
        return res.json({ shortUrl: urlDoc.shortUrl });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Helper function to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = router; 