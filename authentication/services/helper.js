const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

const salt = 16;

// to generate hash password 
async function hashPassword(password) {
    return await bcrypt.hash(password, salt);
}

module.exports = { generateTokenJWT, generateApiKey, hashPassword }