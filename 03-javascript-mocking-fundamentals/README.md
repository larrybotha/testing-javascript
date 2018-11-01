# JavaScript Mocking Fundamentals

1. [Override Object Properties to Mock with Monkey-patching in JavaScript](./01-override-object-props-to-mock-with-monkey-patching.no-framework.test.js)

   ```bash
   $ node 01-override-object-props-to-mock-with-monkey-patching.no-framework.js

   # or
   $ npx jest 01
   ```

   We import both `thumb-war` and `utils`, and mock out `utils.getWinner` so
   that we can evaluate other aspects of `thumb-war`. We are making
   `utils.getWinner` deterministic, as the randomness of what it usually returns
   will affect the outcomes of our tests in non-deterministic ways.

   After mocking, one should always clean up so that subsequent tests are not
   affected by the mock.

2. [Ensure Functions are Called Correctly with JavaScript Mocks](./02-ensure-functions-are-called-correctly-with-javascript-mocks.test.js)

   ```bash
   $ node
   02-ensure-functions-are-called-correctly-with-javascript-mocks.no-framework.js

   # or
   $ npx jest 02
   ```

   We can create a naive `jest.fn` which takes a mock implementation, and
   accepts all arguments passed to it.

   Onto this mock function we can add a `mock` object where we can store calls
   to the mock function.

   This can all be done using `jest.fn`.

   Jest allows one to inspect a mocked function using `toHaveBeenCalledWith`,
   `toHaveBeenNthCalledWith`, or to inspect `mockFn.mock.calls` to inspect how
   the function was used for all calls.
