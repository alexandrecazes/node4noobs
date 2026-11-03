const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// in-memory database to test
const users = [];

/**
 * Register route
 * Check if username already exists
 * Hash password
 * Create new user
 * 
 */
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (user)
            return res.status(400).json({ message: 'OPS! Username already taken' });

        const salt = 16;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };
        users.push(newUser);
        res.status(201).json({
            message: 'WINS! User registered successfully',
            userId: newUser.id
        });
    } catch (error) {
        res.status(500).json({ message: 'OPS! Error registering' });
    }
});

/**
 * Login route
 * Find user
 * Compare password with stored hash
 * 
 */
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user)
            return res.status(401).json({ message: 'OPS! Invalid credentials' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch)
            return res.status(401).json({ message: 'OPS! Invalid credentials'});

        res.json({
            message: 'WINS! Login successful',
            userId: user.id
        });
    } catch (error) {
        res.status(500).json({ message: 'OPS! Error logging in' });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});