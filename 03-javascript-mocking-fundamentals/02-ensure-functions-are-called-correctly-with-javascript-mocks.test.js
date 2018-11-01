const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

test('returns winner', () => {
  const originalGetWinner = utils.getWinner;
  // we use jest.fn to mock this instead, so that we can inspect what it's being
  // called with
  // utils.getWinner = (p1, _) => p1;

  const p1 = 'Kent C Dodds';
  const p2 = 'Ken Wheeler';
  utils.getWinner = jest.fn((p1, p2) => p1);
  // With our previous mock, if thumbWar passed only 1 variable through to getWinner
  // we would not pick up that there's an error
  const winner = thumbWar(p1, p2);

  expect(winner).toBe(p1);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);

  // with Jest we can evaluate the parameters a function is called with
  expect(utils.getWinner).toHaveBeenCalledWith(p1, p2);

  // we can even inspect what it was called with at the nth call
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, p1, p2);
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, p1, p2);

  // or, we can wrap the 3 tests above into a single test
  expect(utils.getWinner.mock.calls).toEqual([[p1, p2], [p1, p2]]);

  // and clean up the mock here
  utils.getWinner = originalGetWinner;
});
