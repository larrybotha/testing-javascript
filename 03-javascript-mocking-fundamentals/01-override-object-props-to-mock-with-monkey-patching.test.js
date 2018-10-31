const thumbWar = require('./src/thumb-war');
const utils = require('./src/utils');

const originalGetWinner = utils.getWinner;

test('thumbWar', () => {
  // in the same way we mocked getWinner in the non-framework file, we can mock
  // it here
  utils.getWinner = (p1, _) => p1;

  const p1 = 'Kent C Dodds';
  const p2 = 'Ken Wheeler';
  const winner = thumbWar(p1, p2);

  expect(winner).toBe(p1);

  // and clean up the mock here
  utils.getWinner = originalGetWinner;
});
