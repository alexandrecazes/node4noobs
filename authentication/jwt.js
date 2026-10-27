const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('./middleware/authenticate');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const JWT_SECRET = process.env.JWT_SECRET;

// data tests
const users = [
    {
        id: 1,
        username: 'user2',
        password: 'key123',
        role: 'admin'
    }
];

// login route - generate token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user)
        return res.status(401).json({ message: 'OPS! Invalid credentials'});

    // create payload for JWT
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    // sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'WINS! Login successful', token});
});

// protected route
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ 
        message: 'WINS! Profile accessed', 
        use: req.user
    });
});

// role-based route
app.get('/admin', authenticateJWT, ( req, res) => {
    // check if user has admin role
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'OPS! Access denied'});

    res.json({ message: 'WINS! Admin Painel accessed' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});