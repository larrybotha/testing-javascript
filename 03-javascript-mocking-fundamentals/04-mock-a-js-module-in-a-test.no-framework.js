const fn = (impl = () => {}) => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);

    return impl(...args);
  };

  mockFn.mock = {calls: []};
  mockFn.mockImplementation = newImpl => (impl = newImpl);

  return mockFn;
};

// jest.mock takes control of the entire module requiring system
// This can be simulated using require.cache
// inspecting the require.cache we can see it's an object with keys for each
// import, as well as an id for each import, filename, and a number of other
// properties
// console.log(require.cache);

// we'll use require.cache to replace mporting of our utils module with the
// mocked implementation
const utilsPath = require.resolve('./src/utils');

// override the utils import at the require.cache key
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  // and mock the implementation of the module
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
};

const assert = require('assert');

const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const p1 = 'Kent C Dodds';
const p2 = 'Ken Wheeler';

// we don't need spyOn anymore
// const spyOn = (obj, prop) => {
//   const originalValue = obj[prop];
//   obj[prop] = fn();

//   obj[prop].mockRestore = originalValue;
// };

// we no longer need spyOn because we're replacing the module using
// require.cache
// spyOn(utils, 'getWinner');
// utils.getWinner.mockImplementation((p1, _) => p1);

const winner = thumbWar(p1, p2);

try {
  assert.strictEqual(winner, p1);

  console.log(true);
} catch (e) {
  console.log(false);
}

console.log(utils.getWinner.mock.calls);

// we don't use mockRestore, because we're no longer using spyOn
// utils.getWinner.mockRestore();

// instead we delete our cache override
// This prevents our mocked module from interfering with other modules that
// import utils
delete require.cache[utilsPath];
