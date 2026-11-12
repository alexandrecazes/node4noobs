const { describe, test } = require('node:test');
const assert = require('assert');
const { sum, subtract, mult, div } = require('../../calculator');

describe('Sum', () => {
    test('should sum two numbers', () => {
        assert.strictEqual(sum(1, 2), 3)    
    })
    test('should sum with negative number', () => {
        assert.strictEqual(sum(-1, 1), 0);    
    })
});

describe('Subtract', () => {
    test('should subtraction two numbers', () => {
        assert.strictEqual(subtract(5, 2), 3);    
    })
    test('subtraction resulting in negative', () => {
        assert.strictEqual(subtract(2, 5), -3);    
    })
});

describe('Multiplication', () => {
    test('should multiplication two numbers', () => {
        assert.strictEqual(mult(3, 6), 18);    
    })
    test('should multiplication with negative numbers', () => {
        assert.strictEqual(mult(3, -6), -18);    
    })
    test('should multiplication by zero', () => {
        assert.strictEqual(mult(0, 10), 0);    
    })
});

describe('Division', () => {
    test('should division two numbers', () => {
        assert.strictEqual(div(0, 2), 0);    
    })
    test('should division by zero', () => {
        assert.strictEqual(div(10, 0), Infinity);    
    })
});


