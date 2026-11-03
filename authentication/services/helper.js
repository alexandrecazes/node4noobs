const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// to generate JWT token
function generateTokenJWT(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }        
    );
}

// to generate API keys
function generateApiKey() {
    return [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString())
        .join('');
}

module.exports = { generateTokenJWT, generateApiKey }