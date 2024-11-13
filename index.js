const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Session middleware
app.use(session({
    secret: 'your-secret-key', // Use environment variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', require('./routes/staticRouter'));
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/index'));  // Mount URL shortener routes at root

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
