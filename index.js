const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB with more detailed logging
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected Successfully');
    // Log the connection state
    console.log('Connection state:', mongoose.connection.readyState);
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
});

// Log database events
mongoose.connection.on('error', err => {
    console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
