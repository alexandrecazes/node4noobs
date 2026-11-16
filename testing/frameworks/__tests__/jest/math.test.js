const { sum, divide } = require('../../utils/math');

describe('Math utilities', () => {
    describe('sum()', () => {
        it('should add two numbers correctly', () => {
            expect(sum(1, 2)).toBe(3);
            expect(sum(-1, 1)).toBe(0);
        })
        it('should throw error for non-number inputs', () => {
            expect(() => sum('1', 2)).toThrow('OPS! Both arguments must be numbers');
        })
    });

    describe('divide()', () => {
        it('should divide two numbers correctly', () => {
            expect(divide(100, 10)).toBe(10);
        })
        it('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('OPS! Division by zero');
        })
    });
});