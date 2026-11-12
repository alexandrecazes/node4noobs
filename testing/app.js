const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Léia' },
        { id: 2, name: 'Han Solo' },
        { id: 3, name: 'Luke' }
    ]);
});

module.exports = app;