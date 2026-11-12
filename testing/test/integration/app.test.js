const test = require('node:test');
const assert = require('assert');
const http = require('http');
const app = require('../../app');

const server = app.listen(8081);

/**
 * Make a request to the API
 * Verify the response
 * Close server
 * 
 */
http.get('http://localhost:8081/users', (res) => {
    let data = "";

    res.on('data', (chuck) => {
        data += chuck;
    });

    res.on('end', () => {
        const users = JSON.parse(data);
        
        test('Status code', () => {
            assert.strictEqual(res.statusCode, 200, 'status code should be 200');
        });
        test('Users length', () => {
            assert.strictEqual(users.length, 3, 'should return three users');
        });
        test('User name', () => {
            assert.strictEqual(users[1].name, 'Han Solo', 'Second user should be Han Solo');
        });

        server.close();
    });
   
}).on('error', (err) => {
    console.error("OPS! Test failed ", err);
    server.close();
});