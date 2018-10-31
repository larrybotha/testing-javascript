const assert = require('assert');

const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const p1 = 'Kent C Dodds';
const p2 = 'Ken Wheeler';
const originalGetWinner = utils.getWinner;

// This is our mock right here
// We monkey-patch the utils module, replacing getWinner specifically, so that
// we can test other aspects of thumbWar
utils.getWinner = (p1, _) => p1;

const winner = thumbWar(p1, p2);

try {
  assert.strictEqual(winner, p1);

  console.log(true);
} catch (e) {
  console.log(false);
}

// Clean up our mock be reassigning the mocked property to the original
// property.
// This is done to prevent our mock in this test from affecting our module in
// other tests.
utils.getWinner = originalGetWinner;
