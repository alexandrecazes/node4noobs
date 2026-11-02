const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// for JWT verification
const authenticateJWT = (req, res, next) => {
    // get authorization header - 'authorization header' is commonly used to send authentication tokens
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: 'OPS! Authorization header missing' });

    // extract token from Bearer 
    const token = authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'OPS! Token missing' });

    try {
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'OPS! Invalid or expired token' });
    }
}

// for basic authentication
const basicAuth = (users) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // if no credentials provided, request authentication
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="API Authentication"');
        return res.status(401).json({ message: 'OPS! Authentication required' });
    }

    // extract and decode credentials
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        res.setHeader('WWW-Authenticate', 'Basic realm="API Authentication"');
        return res.status(401).json({ message: 'OPS! Invalid credentials' });
    }

    // attach user to request
    req.user = { username: user.username };

    next()
}

// for OAuth authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// for API key authentication 
const authenticateApiKey = (apiKeys) => (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apikey) 
        return res.status(401).json({ error: 'OPS! API key is required' });
    
    const keyData = apiKeys.get(apiKey);

    if (!keyData)
        return res.status(403).json({ error: 'OPS! Invalid API key' });

    // attach key data to request for use in route handlers
    req.apiKeyData = keyData;
    next();
}

module.exports = { authenticateJWT, basicAuth, isAuthenticated, authenticateApiKey };