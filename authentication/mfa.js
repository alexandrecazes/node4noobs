const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const dotenv = require('dotenv');

const { generateTokenJWT } = require('./services/helper');

dotenv.config();
const app = express();

// parse request bodies
app.use(express.json());                    
app.use(express.urlencoded({ extended: true }));

// in-memory database for test
const users = [];

/**
 * Register a user and set up MFA
 * Check if user already exists
 * Generate secret for TOTP
 * Create user (in production, use hash password)
 * Generate QR code for TOTP
 * 
 */
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user)
        return res.status(400).json({ message: 'OPS! Username already exists' });

    const secret = speakeasy.generateSecret({ name: `MfaApp:${username}` });
    const newUser = {
        id: users.length + 1,
        username,
        password,
        mfaSecret: secret.base32,
        mfaEnabled: false
    };
    users.push(newUser);

    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        if (err)
            return res.status(500).json({ message: 'OPS! Error generating QR code' });

        res.json({
            message: 'WINS! User registered. Please set up MFA',
            user: {
                id: newUser.id,
                username: newUser.username
            },
            mfaSecret: secret.base32,
            qrCode: dataUrl 
        });
    });
});

/**
 * Verify and enable MFA
 * Find user
 * Verify token against user's secret
 * Enable MFA for user
 * 
 */
app.post('/verify-mfa', (req, res) => {
    const { username, token } = req.body;
    const user = users.find(u => u.username === username);

    if (!user)
        return res.status(404).json({ message: 'OPS! User not found' });

    const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token
    });

    if (!verified)
        return res.status(400).json({ message: 'OPS! Invalid MFA token' });

    user.mfaEnabled = true;
    res.json({ message: 'MFA enabled successfully' });
});

/**
 * Login with MFA
 * Find user
 * Check if MFA enabled
 * If MFA not enabled, generate token directly
 * Generate JWT token
 * 
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user)
        return res.status(401).json({ message: 'OPS! Invalid credentials' });

    if (user.mfaEnabled) {
        return res.json({
            message: 'Password verified. MFA token required',
            requireMFA: true,
            userId: user.id
        });
    }

    const token = generateTokenJWT();
    res.json({ 
        message: 'WINS! Login successful', token });
});

/**
 * Verify MFA token and complete login
 * Find user
 * Verify MFA token
 * Generate JWT token
 *
 */
app.post('verify-login', (req, res) => {
    const { userId, mfaToken } = req.body;
    const user = users.find(u => u.id === userId);

    if (!user)
        return res.status(404).json({ message: 'OPS! User not found' });

    const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: mfaToken
    });

    if (!verified)
        return res.status(401).json({ message: 'OPS! Invalid MFA token' });

    const token = generateTokenJWT();
    res.json({ message: 'WINS! Login successful', token });
});

const port = process.env.PORt || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});