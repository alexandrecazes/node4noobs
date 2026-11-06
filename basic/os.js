const os = require('os');

console.log(`System version: ${os.version()} `);
console.log(`Plataform: ${os.platform}`);
console.log(`Type: ${os.type}`);
console.log(`Release: ${os.release}`);
console.log(`CPU Architecture: ${os.arch}`);