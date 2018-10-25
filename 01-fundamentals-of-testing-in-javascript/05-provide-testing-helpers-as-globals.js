const {subtractAsync, sumAsync} = require('./math');

// by running this file with globals configured,
// i.e. running node --require ./[my-globals-module]
// we don't have to import the helpers anymore
test('sum async', async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
});

test('subtract async', async () => {
  const result = await subtractAsync(10, 7);
  const expected = 3;

  expect(result).toBe(expected);
});
