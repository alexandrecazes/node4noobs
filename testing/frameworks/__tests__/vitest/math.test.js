const { describe, it, expect } = require('vitest');
const { sum } = require('../../utils/math');

describe('sum()', () => {
    it('should sum two numbers', () => {
        expect(sum(30, 10)).toBe(40);
    })
    it('should throw error for invalid inputs', () => {
        expect(() => sum('30', 10)).toThrow('OPS! Both arguments must be numbers');
    })
});