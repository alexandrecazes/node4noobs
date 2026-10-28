const express = require('express');
const { basicAuth } = require('./middleware/authenticate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// data tests
const users = [
    {
        username: 'user3',
        password: 'key23'
    }
];

app.get('/api/data', basicAuth(users), (req, res) => {
    res.json({
        message: 'Data accessed',
        user: req.user.username,
        data: {
            info: 'Sensitive data'
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

