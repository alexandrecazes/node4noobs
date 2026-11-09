const { error } = require('console');
const fs = require('fs');
const path = require('path');

/**
 * Node.js uses a single-threaded, event-driven architecture that is designed to handle many 
 * connections at once, efficiently and without blocking the main thread.
 * 
 * Key Characteristics: 
 * Non-blocking I/O, event-driven, single-threaded with event loop, asynchronous execution.
 * 
 * Blocking vs Non-blocking Code
 * 
 */


const file = path.join(__dirname, 'readfile.txt');

// Blocking
console.log("Starting...");
//console.log(file);
const data = fs.readFileSync(file, 'utf-8');
console.log(`Message: ${data}`);
console.log("Operation completed.\n");

console.log("**********************************************\n");

// Non-blocking
console.log("Starting...");
fs.readFile(file, 'utf-8', (error, data) => {
    if (error) 
        console.error(`OPS! ${error.message}`);
        return;
        
    console.log(`Message: ${data}`);
});
console.log("Waiting...");
