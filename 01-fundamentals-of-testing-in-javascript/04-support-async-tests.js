const {subtractAsync, sumAsync} = require('./math');

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

// the original function won't work, as our callbacks are now async, and they
// will return immediately, giving false positives, but with an
// UnhandledRejectionPromise being thrown
// To fix this, we make 'test' async, and we await the response from the
// callback.
// This works for non-async tests, too, as async functions awaiting non-Promises
// return a resolved promise.
async function test(title, callback) {
  try {
    await callback();

    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✗ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual() {},
    toBeGreaterThan() {},
  };
}
