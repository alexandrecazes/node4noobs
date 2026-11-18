const { expect } = require('chai');
const { sum, divide } = require('../../utils/math');

describe('Math Utilities', () => {
    describe(' sum()', () => {
        it('should return the sum of two numbers', () => {
            expect(sum(25, 12)).to.equal(37);
            expect(sum(-2, 1)).to.equal(-1);
        })
         it('should throw error for non-numbers inputs', () => {
            expect(() => sum('2', 2)).to.throw('OPS! Both arguments must be numbers')
         })
    });

    describe('divide()', () => {
        it('should divide two numbers correctly', () => {
            expect(divide(14, 7)).to.equal(2);
        })
        it('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).to.throw('OPS! Division by zero');
        })
    });
});