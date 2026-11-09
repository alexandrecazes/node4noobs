const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'readfile.txt');

fs.readFile(file, 'utf-8', (error, data) => {
    if (error) {
        console.error("OPS! Error reading file", error);
        return;
    }
    console.log(`Message: ${data}`);
});

console.log("Reading file...");