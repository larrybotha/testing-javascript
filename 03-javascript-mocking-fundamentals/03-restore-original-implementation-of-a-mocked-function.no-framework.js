const assert = require('assert');

const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const p1 = 'Kent C Dodds';
const p2 = 'Ken Wheeler';

// fn now assigns a default value to the mock implementation
const fn = (impl = () => {}) => {
  // retain our existing mock function
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);

    return impl(...args);
  };

  mockFn.mock = {calls: []};
  // set a mockImplementation property on the mock which accepts a new
  // implementation, and assigns originally passed in implementation to the new
  // implementation
  mockFn.mockImplementation = newImpl => (impl = newImpl);

  // return the mock function
  return mockFn;
};

const spyOn = (obj, prop) => {
  // store the original value
  const originalValue = obj[prop];
  // add props to the property
  obj[prop] = fn();

  // add a property to the watched property allowing it to be restored
  obj[prop].mockRestore = originalValue;
};

// my implementation
// const spyOn = (obj, fnToSpy) => {
//   const original = obj[fnToSpy];
//   const mockImplementation = impl => {
//     obj[fnToSpy] = (...args) => {
//       obj[fnToSpy].mock.calls.push(args);

//       return impl(...args);
//     };

//     obj[fnToSpy].mock = {calls: []};
//     obj[fnToSpy].mockRestore = () => (obj[fnToSpy] = original);
//     obj[fnToSpy].mockImplementation = mockImplementation;
//   };

//   obj[fnToSpy].mockImplementation = mockImplementation;

//   obj[fnToSpy].mockImplementation(obj[fnToSpy]);
// };

spyOn(utils, 'getWinner');
utils.getWinner.mockImplementation((p1, _) => p1);

const winner = thumbWar(p1, p2);

try {
  assert.strictEqual(winner, p1);

  console.log(true);
} catch (e) {
  console.log(false);
}

console.log(utils.getWinner.mock.calls);

utils.getWinner.mockRestore();
