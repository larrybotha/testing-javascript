const {subtract, sum} = require('./math');

const sumTest = () => {
  const result = sum(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
};
test('sum', sumTest);

const subtractTest = () => {
  const result = subtract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
};
test('subtract', subtractTest);

// to address errors exiting the process, and it not being clear where issues
// are occuring, we can create a function that takes a title, and a callback
// where the actual tests themselves are run
// Those tests may now throw errors, while allowing other tests to run, and we
// can indicate which test failed by naming the tests
function test(title, callback) {
  // because this test could throw an error, we wrap it in a try-catch
  try {
    callback();

    // if it doesn't throw an error then we can log the success
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
        // because the error is thrown here, our stack trace indicates that this
        // is where the problem is, when the problem is actually with the code
        // we're evaluating
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual() {},
    toBeGreaterThan() {},
    // ...
  };
}
