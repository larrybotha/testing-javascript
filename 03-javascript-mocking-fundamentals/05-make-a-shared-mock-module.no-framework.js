// prime the cache with our mock implementation
require('./src/__no-framework-mocks__/utils');

// get the path from require.cache for the mocked utils
const mockUtilsPath = require.resolve('./src/__no-framework-mocks__/utils');
// get the path from require.cache for the actual utils
const utilsPath = require.resolve('./src/utils');
// set any imports for the actual utils module to instead use the shared mock
// implementation
require.cache[utilsPath] = require.cache[mockUtilsPath];

const assert = require('assert');

const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const p1 = 'Kent C Dodds';
const p2 = 'Ken Wheeler';

const winner = thumbWar(p1, p2);

try {
  assert.strictEqual(winner, p1);

  console.log(true);
} catch (e) {
  console.log(false);
}

console.log(utils.getWinner.mock.calls);

delete require.cache[utilsPath];
