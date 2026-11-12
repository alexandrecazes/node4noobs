const { describe, test } = require('node:test');
const assert = require('assert');
const UserService = require('../UserService');

/**
 * Create a mock database to test
 * 
 * Implementation return test data
 * 
 */
const database = {
    findById: async (id) => {
        if (id === 1)
            return { id: 1, name: 'Anakin', email: 'anakin@test.com' };

        return null;
    }   
};

/**
 * Test successful retrievel
 * 
 * Test error handling
 * 
 */
async function testUserService() {
    const userService = new UserService(database); 
    const user = await userService.getUserById(1);

    test('should retrieve correct user name'), () => {
        assert.strictEqual(user.name, 'Anakin', true);
    }

    try {
        await userService.getUserById(99);
        assert.fail('Should have thrown an error for non-existent user');
    } catch(err) {
        assert.strictEqual(err.message, 'OPS! User not found');
    }
}

testUserService()
    .catch(err => {
        console.error("OPS! Test failed ", err);
});