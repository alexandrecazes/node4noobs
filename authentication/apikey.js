const dotenv = require('dotenv');
const express = require('express');

const { authenticateApiKey } = require('./middleware/authenticate');
const { generateApiKey } = require('./services/helper');

dotenv.config();
const app = express();

// Parse request bodies
app.use(express.json());                    
app.use(express.urlencoded({ extended: true }));

// in-memory storage for API keys test
const apiKeys = new Map([
    [
        'xyz123', { name: 'Mobile App', permissions: ['read:data'] }
    ],
    [
        'defcon666', { name: 'Web Client', permissions: ['read:data', 'write:data'] }
    ]
]);

// protected route using API key
app.get('/api/data', authenticateApiKey, (req, res) => {
    res.json({
        message: 'WINS! Access granted',
        client: req.apiKey.name,
        timestamp: new Date().toISOString()
    });
});

// route to generate a new API key (security tips: protected by admin auth)
app.post('/api/keys', (req, res) => {
    const { name, permissions } = req.body;
    const apiKey = generateApiKey(); // Implement your key generation logic
    apiKeys.set(apiKey, { name, permissions });
    res.status(201).json({ apiKey });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});