const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Object will store data for each request (memory leak)
 * Generate a unique request ID
 * Store data in the global object (THIS IS THE MEMORY LEAK)
 * Create a large object to make the leak more obvious
 * Allocate 1MB per  (1024 bytes = 1KB * 1024 = 1M )
 * Log memory usage after each request
 * 
 */

const requestData = {};

const server = http.createServer((req, res) => {
    const requestId = Date.now() + Math.random().toString(36).substring(2, 15);

    requestData[requestId] = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        timestamp: Date.now(),
        payload: Buffer.alloc(1024 * 1024)
    };

    const memoryUsage = process.memoryUsage();
    
    console.log(`Memory usage after request ${requestId}:`);
    console.log(`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`);
    console.log(`Request Count: ${Object.keys(requestData).length}`);
    
    res.end("WINS! Request processed");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
