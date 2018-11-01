const assert = require('assert');

const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const p1 = 'Kent C Dodds';
const p2 = 'Ken Wheeler';
const originalGetWinner = utils.getWinner;

// this is a naive implentation of jest.fn
// We accept an implementation of the function we are going to mock
const fn = impl => {
  // and use it to create a new mock function which accepts any arguments
  const mockFn = (...args) => {
    // we can track arguments passed to this function by pushing the arguments
    // to an array on a property on the function, called 'mock'
    mockFn.mock.calls.push(args);

    return impl(...args);
  };

  // mockFn.mock is where we can store details about the mock function
  mockFn.mock = {calls: []};

  return mockFn;
};

utils.getWinner = fn((p1, _) => p1);

const winner = thumbWar(p1, p2);

try {
  assert.strictEqual(winner, p1);

  console.log(true);
} catch (e) {
  console.log(false);
}

// we can now access details about the mock implementation of our function
console.log(utils.getWinner.mock.calls);

utils.getWinner = originalGetWinner;
