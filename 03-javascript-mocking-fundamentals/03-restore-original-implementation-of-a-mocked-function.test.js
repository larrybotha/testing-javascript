const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

test('returns winner', () => {
  // with spyOn we no longer need to keep track of the original function
  jest.spyOn(utils, 'getWinner');
  // we can still mock the original function, however
  // utils.getWinner = jest.fn((p1, p2) => p1);
  // but because the function is being spied on, we get an additional
  // mockImplementation property on our spied-on function which allows us to
  // override the original in a simiar way to jest.fn
  utils.getWinner.mockImplementation((p1, p2) => p1);

  const p1 = 'Kent C Dodds';
  const p2 = 'Ken Wheeler';
  const winner = thumbWar(p1, p2);

  expect(winner).toBe(p1);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);

  expect(utils.getWinner.mock.calls).toEqual([[p1, p2], [p1, p2]]);

  // and instead of explicitly restoring the original function, we can use
  // mockRestore on the on mock implementation
  utils.getWinner.mockRestore();
});
