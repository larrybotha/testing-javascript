# Fundamentals of Testing in Javascript

https://testingjavascript.com/courses/fundamentals-of-testing-in-javascript

1. [Throw an Error with a Simple Test in JavaScript](./01-throw-an-error.js)

    ```javascript
    $ node 01-throw-an-error.js
    ```

    Throwing an error when a condition fails is the most fundamental aspect of a test.

2. [Abstract Test Assertions into a JavaScript Assertion Library](./02-abstract-assertions.js)

    ```javascript
    $ node 02-abstract-assertions.js
    ```

    An assertion library can be as simple as a function which takes a result and
    returns an object containing a number of different assertions which allows
    the user to determine how they want to evaluate that result against an
    expected value.

3. [Encapsulate and Isolate Tests by building a JavaScript Testing Framework](./03-encapsulate-and-isolate-tests.js)

    ```javascript
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

4. [Support Async Tests with JavaScripts Promises through async await](./04-support-async-tests.js)

    ```javascript
    $ node 04-support-async-tests.js
    ```

    In order to allow async tests to be run, we need our `test` function to be
    `async`, and we need to prepend the callack invocation with `await`.

