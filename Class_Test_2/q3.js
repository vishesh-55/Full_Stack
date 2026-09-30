const express = require('express');

const app = express();

app.use(express.json());

function requireAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== 'secret123') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    next();
}

app.get('/api/books', (req, res) => {
    res.json({
        message: 'Public GET route'
    });
});

app.post('/api/books', requireAuth, (req, res) => {
    res.status(201).json({
        message: 'Book created',
        book: req.body
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});