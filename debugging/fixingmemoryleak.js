const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Object will store data for each request
 * Generate a unique request ID
 * Store data in the global object 
 * Clean up after the response is sent (FIX FOR THE MEMORY LEAK)
 * 
 */

const requestData = {};

const server = http.createServer((req, res) => {
    const requestId = Date.now() + Math.random().toString(36).substring(2, 15);

    requestData[requestId] = {
        url: req.url,
        method: req.method,
        timestamp: Date.now(),
    };
    res.on('finish', () => {
        delete requestData[requestId];
        console.log(`Cleaned up request ${requestId}`)
    });    
    res.end("WINS! Request processed");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
