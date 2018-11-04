const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

// instead of monkey-patching utils, we can mock it out entirely using jest.mock
// This works because we're using common js, but if we were using es6 imports
// then monkey-patching woujldn't work. We'd have to mock any imported modules
// Jest hoists this mock to the top of the file, so we don't need to worry about
// placing it before thea actual imports.
jest.mock('./src/utils', () => {
  return {
    getWinner: jest.fn((p1, _) => p1),
  };
});

test('returns winner', () => {
  // because we're now mocking the entire utils module with jest.mock, and not
  // monkey-patching it, we no longer need to use jest.spyOn and create a mock
  // implementation
  // jest.spyOn(utils, 'getWinner');
  // utils.getWinner.mockImplementation((p1, p2) => p1);

  const p1 = 'Kent C Dodds';
  const p2 = 'Ken Wheeler';
  const winner = thumbWar(p1, p2);

  expect(winner).toBe(p1);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);

  expect(utils.getWinner.mock.calls).toEqual([[p1, p2], [p1, p2]]);

  // instead of using mockRestore to restore the monkey-patched implementation,
  // we reset the mock implementation using mockReset
  // This will clean up the calls
  utils.getWinner.mockReset();
});
