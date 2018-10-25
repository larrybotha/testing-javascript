const {subtractAsync, sumAsync} = require('./math');

// we don't need our globals anymore; the API here is the same as provided by
// Jest.
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
