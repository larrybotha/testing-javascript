# Fundamentals of Testing in Javascript

https://testingjavascript.com/courses/fundamentals-of-testing-in-javascript

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [1. Throw an Error with a Simple Test in JavaScript](#1-throw-an-error-with-a-simple-test-in-javascript)
- [2. Abstract Test Assertions into a JavaScript Assertion Library](#2-abstract-test-assertions-into-a-javascript-assertion-library)
- [3. Encapsulate and Isolate Tests by building a JavaScript Testing Framework](#3-encapsulate-and-isolate-tests-by-building-a-javascript-testing-framework)
- [4. Support Async Tests with JavaScripts Promises through async await](#4-support-async-tests-with-javascripts-promises-through-async-await)
- [5. Provide Testing Helper Functions as Globals in JavaScript](#5-provide-testing-helper-functions-as-globals-in-javascript)
- [6. Verify Custom JavaScript Tests with Jest](#6-verify-custom-javascript-tests-with-jest)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Throw an Error with a Simple Test in JavaScript

[01-throw-an-error.js ](./01-throw-an-error.js)

```bash
$ node 01-throw-an-error.js
```

Throwing an error when a condition fails is the most fundamental aspect of a test.

## 2. Abstract Test Assertions into a JavaScript Assertion Library

[02-abstract-assertions.js](./02-abstract-assertions.js)

```bash
$ node 02-abstract-assertions.js
```

An assertion library can be as simple as a function which takes a result and
returns an object containing a number of different assertions which allows
the user to determine how they want to evaluate that result against an
expected value.

## 3. Encapsulate and Isolate Tests by building a JavaScript Testing Framework

[03-encapsulate-and-isolate-tests.js](./03-encapsulate-and-isolate-tests.js)

```bash
$ node 03-encapsulate-and-isolate-tests.js
```

Our naive implementation works, but prevents subsequent errors from being
thrown. Additionally, the stack trace indicates the issue is at the location
where the error was thrown. A better solution would be to allow tests to
continue running beyond the failed ones, and indicates which test is
revealing and issue.

This can be fixed by creating a function which takes a title, allowing us to
name tests, and a callback function which will be responsible for running
the actual tests, and making use of a try-catch block so as to prevent
thrown errors from stopping further execution.

## 4. Support Async Tests with JavaScripts Promises through async await

[04-support-async-tests.js](./04-support-async-tests.js)

```bash
$ node 04-support-async-tests.js
```

In order to allow async tests to be run, we need our `test` function to be
`async`, and we need to prepend the callack invocation with `await`.

## 5. Provide Testing Helper Functions as Globals in JavaScript

[05-provide-testing-helpers-as-globals.js](./05-provide-testing-helpers-as-globals.js)

```bash
$ node --require ./setup-globals.js 05-provide-testing-helpers-as-globals.js
```

Because of the usefulness of test utilities one could extract them into a
module and import them everywhere.

Another strategy, because we're in a test environment and globals are
pragmatic in this situation, is to make the helpers available globally.

The `--require ./[file].js` flag allows files to be required before
executing scripts with the `node` command

## 6. Verify Custom JavaScript Tests with Jest

[06-verify-custom-js-tests-with-jest.test.js](./06-verify-custom-js-tests-with-jest.test.js)

```javascript
$ npx jest
```

We've implemented the Jest API in our tests, so we can instead run Jest.
