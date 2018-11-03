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
   $ node 02-ensure-functions-are-called-correctly-with-javascript-mocks.no-framework.js

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

3. [Restore the Original Implementation of a Mocked JavaScript Function with jest.spyOn](./ 03-restore-original-implementation-of-a-mocked-function.test.js)

   ```bash
   $ npx jest 03

   # or
   $ node 03-restore-original-implementation-of-a-mocked-function.no-framework.js
   ```

   An alternative to using jest.fn to replace a function with a mock
   implementation is to use `jest.spyOn` to create a mock implementation. This
   mitigates us having to store the original function and replace it, as Jest
   will do the heavy lifting for us.

   1. Use `jest.spyOn(myObject, 'myObjectFn')`
   2. Use `myObject.myObjectFn.mockImplementation(mockFn)` to create a mock
      implementation of `myObjectFn`
   3. Once done testing the implementation, use
      `myObject.myObjectFn.mockRestore()` to replace the mock implementation with
      the original so that other tests are not affected
