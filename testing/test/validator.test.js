const { describe, test } = require('node:test');
const assert = require('assert');
const validatorPassword = require('../validator');

describe('test for password length', () => {
    test('should reject password shorter than 8 characters', () => {
        assert.strictEqual(validatorPassword('root100'), false)
    })
    test('should accept password 8+ characters long', () => {
        assert.strictEqual(validatorPassword('root100def'), true)
    })
});

describe('test for numbers requirement', () => {
    test('should reject passwords without numbers', () => {
        assert.strictEqual(validatorPassword('abctoor'), false)
    })
    test('should accept passwords with numbers', () => {
        assert.strictEqual(validatorPassword('toor123a'), true)
    })
});

