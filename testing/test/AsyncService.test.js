const { describe, test } = require('node:test');
const assert = require('assert');
const AsyncService = require('../AsyncService');

/**
 * Test fetchData()
 * 
 * Test processData()
 * 
 */
async function testAsyncService() {
   const service = new AsyncService();
   const fetchResult = await service.fetchData();
   const processResult = await service.processData();

   describe('test fetchData', () => {
        test('should return success status', () => {
            assert.strictEqual(fetchResult.status, 'success', true);
        })
        test('should return correct data array', () => {
            assert.deepStrictEqual(fetchResult.data, [83, 12, 25], true);
        })
   });

   describe('test processData', () => {
        assert.deepStrictEqual(processResult, [166, 24, 50], true);        
   });
}

testAsyncService()
    .catch(err => {
        console.error('OPS! Test failed', err);
    });