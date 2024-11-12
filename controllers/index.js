const Url = require('../models/url');
const shortid = require('shortid');

const handleGenerateShortURL = async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url || !url.trim()) {
            return res.status(400).json({ error: 'Please provide a URL' });
        }

        // Ensure URL has http:// or https:// prefix
        let validUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            validUrl = 'https://' + url;
        }

        // Check if URL already exists
        let urlDoc = await Url.findOne({ originalUrl: validUrl });
        
        if (urlDoc) {
            return res.json({ shortUrl: urlDoc.shortUrl });
        }

        // Create new short URL
        const shortUrl = shortid.generate();
        urlDoc = new Url({
            originalUrl: validUrl,
            shortUrl,
            createdAt: new Date()
        });

        await urlDoc.save();
        return res.json({ shortUrl: urlDoc.shortUrl });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const handleGetHomePage = (req, res) => {
    res.render('home');
};

const handleRedirect = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Increment clicks
        await Url.updateOne(
            { shortUrl: req.params.shortUrl },
            { $inc: { clicks: 1 } }
        );

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    handleGenerateShortURL,
    handleGetHomePage,
    handleRedirect
};