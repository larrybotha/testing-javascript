const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

// instead of movking a module on a per file basis, we can share the mock
// implementation using a __mocks__ folder with a file for the module exporting
// the mock implementation
// jest.mock('./src/utils', () => {
//   return {
//     getWinner: jest.fn((p1, _) => p1),
//   };
// });

// we now have a __mocks__ folder with our implementation, but because it's
// imported into our test we need to explicitly call jest.mock on the import
// The mock implementation defined in __mocks__ will be used in the tests in
// this file
jest.mock('./src/utils');

test('returns winner', () => {
  const p1 = 'Kent C Dodds';
  const p2 = 'Ken Wheeler';
  const winner = thumbWar(p1, p2);

  expect(winner).toBe(p1);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);

  expect(utils.getWinner.mock.calls).toEqual([[p1, p2], [p1, p2]]);

  utils.getWinner.mockReset();
});
