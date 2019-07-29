# JavaScript Mocking Fundamentals

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [1. Override Object Properties to Mock with Monkey-patching in JavaScript](#1-override-object-properties-to-mock-with-monkey-patching-in-javascript)
- [2. Ensure Functions are Called Correctly with JavaScript Mocks](#2-ensure-functions-are-called-correctly-with-javascript-mocks)
- [3. Restore the Original Implementation of a Mocked JavaScript Function with jest.spyOn](#3-restore-the-original-implementation-of-a-mocked-javascript-function-with-jestspyon)
- [4. Mock a JavaScript module in a test](#4-mock-a-javascript-module-in-a-test)
- [5. Make a shared JavaScript mock module](#5-make-a-shared-javascript-mock-module)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Override Object Properties to Mock with Monkey-patching in JavaScript

[01-override-object-props-to-mock-with-monkey-patching.no-framework.js](./01-override-object-props-to-mock-with-monkey-patching.no-framework.js)

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

## 2. Ensure Functions are Called Correctly with JavaScript Mocks

[02-ensure-functions-are-called-correctly-with-javascript-mocks.test.js](./02-ensure-functions-are-called-correctly-with-javascript-mocks.test.js)

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

## 3. Restore the Original Implementation of a Mocked JavaScript Function with jest.spyOn

[03-restore-original-implementation-of-a-mocked-function.test.js](./03-restore-original-implementation-of-a-mocked-function.test.js)

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
   the original so that other tests are not affected. `.mockRestore()`
   restores the mock implementation to its pre-mocked definition

## 4. Mock a JavaScript module in a test

[04-mock-a-js-module-in-a-test.test.js](./04-mock-a-js-module-in-a-test.test.js)

```bash
$ npx jest 04

# or
$ node 04-mock-a-js-module-in-a-test.no-framework.js
```

Using `jest.spyOn` is still a form of monkey-patching. Monkey-patching is
great for our own modules, because we're using commonjs's `require`. When
working in an es environment we'll have to mock an entire module, and
`jest.mock` allows one to do this.

When using `jest.mock` we can create the mock implementation inside of the
mock, and no longer need to use `jest.spyOn` and
`[fnToMock].mockImplementation`.

Instead of using `mock.mockRestore()` to restore the mock implementation, we now
use `mock.mockReset()`. `mock.mockRestore()` is only available for mocks
created with `jest.spyOn`

`jest.mock` can be placed anywhere in the file, and Jest will hoist it to the
top of the file.

***

`jest.mock` takes control of the entire module requiring system. This can be
simulated using `require.cache`. `require.cache` is an object that has keys
for each import, with each key being associated with an object containining
information regarding the import.

We use the `exports` property to create the mock implementation of the module

## 5. Make a shared JavaScript mock module

[05-make-a-shared-mock-module.test.js](./05-make-a-shared-mock-module.test.js)

```bash
$ npx jest 05

# or
$ node 05-make-a-shared-mock-module.no-framework.js
```

We can have tests automatically use the mock of a module by adding the mock
to a `__mocks__` folder. Node modules can be placed in the `root` `__mocks__`
that Jest inspects, by default adjacent to `node_modules`. For user-defined
`modules` they can be placed in a `__mocks__` folder adjacent to the module.
The mock must use the same filename as the mocked module.

For user-defined modules, if the test imports the module, then
`jest.mock('./path/to/mock')` must be added to the test file.

***

Similarly to how we simulated what Jest is doing when conrolling module
requiring by using `require.cache`. We create a file containing the mock,
which also uses our `fn` to allow us to evaluate calls. In our test we import
our mock, and then retrieve the cached paths for the actual utils and mock
utils, rewriting `require.cache`'s key for the actual utils with the mocked
utils.
