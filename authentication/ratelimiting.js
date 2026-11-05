const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

const { authenticateJWT2 } = require('./middleware/authenticate');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Configure rate limiting
 * 15 minutes
 * 5 attempts per window
 * 
 */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'OPS! Too many attempts, please try again later'
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// data to test
const users = [
    {
        id: 1,
        username: 'user1',
        password: 'key123',
    }
];

// token storage to test
const tokenBlacklist = new Set();
const refreshTokens = new Set();

/**
 * Login route with rate limiting
 * Authentication verification (simplified)
 * Generate tokens
 * Short-lived access token
 * Longer-lived refresh token
 * Store refresh token
 * 
 */
app.post('/login', loginLimiter, (req, res) =>{
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user)
        return res.status(401).json({ message: 'OPS! Invalid credentials' });

    const accessToken = jwt.sign(
        { id: 1, username },
        JWT_SECRET,
        { expiresIn: '15m' }
    );   
    
    const refreshToken = jwt.sign(
        { id: 1, username },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    refreshTokens.add(refreshToken);
    res.json({
        message: 'WINS! Login successful',
        accessToken,
        refreshToken
    });
});

/**
 * Refresh token route
 * Check if token exists and is not blacklisted
 * Verify refrsh token
 * Generate new access token
 * Remove invalid refresh token
 * 
 */
app.post('/refresh', (req, res) =>{
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res.status(401).json({ message: 'OPS! Refresh token required' });

    if (!refreshTokens.has(refreshToken))
        return res.status(403).json({ message: 'OPS! Invalid refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const accessToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({
            message: 'WINS! Token refreshed',
            accessToken
        });
    } catch (error) {
        refreshTokens.delete(refreshToken);
        return res.status(403).json({ message: 'OPS! Invalid or expired refrsh token' });     
    }
});

/**
 * Logout route (protected)
 * Blacklist the current access token
 * Remove refresh token if provided
 * 
 */
app.post('/logout', authenticateJWT2, (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { refreshToken } = req.body;
    tokenBlacklist.add(token);

    if (refreshToken)
        refreshTokens.delete(refreshToken);

    res.json({ message: 'WINS! Logout successful' });
});

/**
 * Home route (protected)
 * 
 */
app.get('/home', authenticateJWT2, (req, res) => {
    res.json({
        message: 'WINS! Home resource accessed',
        user: req.user
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

