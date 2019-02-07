# Test React Components with Jest and `react-testing-library`

Checkout individual branches for changes specific to that section of the course.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [1. Render a React component for testing](#1-render-a-react-component-for-testing)
- [2. Use jest-dom for improved assertions](#2-use-jest-dom-for-improved-assertions)
- [3. Use dom-testing-library to write more maintainable React tests](#3-use-dom-testing-library-to-write-more-maintainable-react-tests)
- [4. Use `react-testing-library` to render and test React Components](#4-use-react-testing-library-to-render-and-test-react-components)
- [5. Avoid Memory leaks using react-testing-library’s cleanup function](#5-avoid-memory-leaks-using-react-testing-librarys-cleanup-function)
- [6. Debug the DOM state during tests using react-testing-library’s debug function](#6-debug-the-dom-state-during-tests-using-react-testing-librarys-debug-function)
- [7. Test React Component Event Handlers with fireEvent from react-testing-library](#7-test-react-component-event-handlers-with-fireevent-from-react-testing-library)
- [8. Assert rendered text with react-testing-library](#8-assert-rendered-text-with-react-testing-library)
- [9. Test prop updates with `react-testing-library`](#9-test-prop-updates-with-react-testing-library)
- [10. Assert that something is NOT rendered with `react-testing-library`](#10-assert-that-something-is-not-rendered-with-react-testing-library)
- [11. Test accessibility of rendered React Components with jest-axe](#11-test-accessibility-of-rendered-react-components-with-jest-axe)
- [12. Mock HTTP Requests with jest.mock in React Component Tests](#12-mock-http-requests-with-jestmock-in-react-component-tests)
- [13. Mock HTTP Requests with Dependency Injection in React Component Tests](#13-mock-http-requests-with-dependency-injection-in-react-component-tests)
- [14. Mock react-transition-group in React Component Tests with jest.mock](#14-mock-react-transition-group-in-react-component-tests-with-jestmock)
- [15. Test componentDidCatch handler error boundaries with react-testing-library](#15-test-componentdidcatch-handler-error-boundaries-with-react-testing-library)
- [16. Test drive the development of a React Form with react-testing-library](#16-test-drive-the-development-of-a-react-form-with-react-testing-library)
- [17. Test drive the submission of a React Form with react-testing-library](#17-test-drive-the-submission-of-a-react-form-with-react-testing-library)
- [18. Test drive the API call of a React Form with react-testing-library](#18-test-drive-the-api-call-of-a-react-form-with-react-testing-library)
- [19. Test drive mocking react-router’s Redirect component on a form submission](#19-test-drive-mocking-react-routers-redirect-component-on-a-form-submission)
- [20. Test drive assertions with dates in React](#20-test-drive-assertions-with-dates-in-react)
- [21. Use generated data in tests with test-data-bot to improve test maintainability](#21-use-generated-data-in-tests-with-test-data-bot-to-improve-test-maintainability)
- [22. Test drive error state with react-testing-library](#22-test-drive-error-state-with-react-testing-library)
- [23. Write a custom render function to share code between tests and simplify tests](#23-write-a-custom-render-function-to-share-code-between-tests-and-simplify-tests)
- [24. Test React components that use the react-router Router Provider with createMemoryHistory](#24-test-react-components-that-use-the-react-router-router-provider-with-creatememoryhistory)
- [25. Initialize the `history` object with a bad entry to test the react-router no-match route](#25-initialize-the-history-object-with-a-bad-entry-to-test-the-react-router-no-match-route)
- [26. Create a custom render function to simplify tests of react-router components](#26-create-a-custom-render-function-to-simplify-tests-of-react-router-components)
- [27. Test a redux connected React Component](#27-test-a-redux-connected-react-component)
- [28. Test a redux connected React Component with initialized state](#28-test-a-redux-connected-react-component-with-initialized-state)
- [29. Create a custom render function to simplify tests of redux components](#29-create-a-custom-render-function-to-simplify-tests-of-redux-components)
- [30. Test a render prop component using a Jest mock function](#30-test-a-render-prop-component-using-a-jest-mock-function)
- [31. Test React portals with react-testing-library](#31-test-react-portals-with-react-testing-library)
- [32. Test Unmounting a React Component with react-testing-library](#32-test-unmounting-a-react-component-with-react-testing-library)
  - [Evaluating different scenarios with timers](#evaluating-different-scenarios-with-timers)
    - [Scenario 1](#scenario-1)
    - [Scenario 2](#scenario-2)
    - [Scenario 3](#scenario-3)
    - [Scenario 3](#scenario-3-1)
    - [Scenario 4](#scenario-4)
    - [Scenario 5](#scenario-5)
    - [Scenario 6](#scenario-6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Render a React component for testing

```bash
$ npx jest favorite
```

To mount a React component we ReactDOM and a node on which to mount it. We
can use `document.createElement('div')` to create a mount point, and then
evaluate that `div`'s content using query selectors.

`HTMLInputElement.type` returns the type of the input.

`Node.textContent` returns the text inside a DOM node and its descendants.

---

Note: No need to install `babel-jest` manually if using Babel 7 as it's already
installed when Jest is installed (see `npx jest --showConfig`). To correctly
transpile JSX you'll need `@babel/core` and `babel-core@7.0.0-bridge.0`.
Tests will transpile JSX without any additional libraries or config.

## 2. Use jest-dom for improved assertions

```bash
$ npx jest favorite
```

To make assertions on DOM nodes easier we can extend expect. Instead of
getting sometimes weird errors that don't explicitly point to the problem,
custom matchers can provide more informative errors.

`jest-dom` is a library that does the heavy lifting for us when it comes to
assertions on the DOM. We have two mechanisms to extend Jest's `expect`
using `jest-dom`'s matchers:

1. explicitly import the matchers you want from `jest-dom`, and then use
  `expect.extend(// object with names of matchers to extend)`
2. import `jest-dom/extend-expect` to make all matchers available in the
  file

Another option is to use Jest's `setupTestFrameworkScriptFile` to extend
`expect` for all files.

## 3. Use dom-testing-library to write more maintainable React tests

```bash
$ npx jest favorite
```

Querying a label by its `textContent` doesn't give us any confidence in the
label actually performing its job. If the `id` attribute is not properly
configured, users will not get the benefit of the label.

We can use `dom-testing-library` to write tests that can better describe how
UIs work and do the heavy lifting for us.

The `queries` export from `dom-testing-library` has a number of methods on
it, one of which is `.getByLabelText` which returns an `HTMLInputElement`
based on the `id` attribute of the `label` matching the text passed into the
function.

Users are not specifically concerned with the case of the `label`s text, so
we can use an case insensitive regex to select the element.

`dom-testing-library` has a convenient export that allows us to retrieve all
the query methods that it exports but for a specific element.

## 4. Use `react-testing-library` to render and test React Components

```bash
$ npx jest favorite
```

If we abstract the rendering of our component, as well as getting all the
queries for the container, to its own function, that function can be used to
query all React components.

Turns out, this is exactly what `react-testing-library` does!

## 5. Avoid Memory leaks using react-testing-library’s cleanup function

```bash
$ npx jest favorite
```

`react-testing-library`'s `render` function works differently from our naive
implementation.

React components are rendered onto the `body` element so that we have full
access to all DOM eventing.

The problem here is that if we don't remove attached events, and don't
remove rendered components, we're prone to memory leaks and faulty tests.

To address this we have a few options:

1. use `unmount` exported from calling `render` to unmount our component
   once a test has run
2. import `cleanup` to manually clean up the DOM after a test has run
3. pass `cleanup` to Jest's `afterEach` hook to automatically clean up the
   DOM after each test runs
4. import `react-testing-library/cleanup-after-each` which will run Jest's
   `afterEach` hook with `cleanup` for us

## 6. Debug the DOM state during tests using react-testing-library’s debug function

```bash
$ npx jest favorite
```

It'd be convenient if one could inspect the result of rendering a React
component.

`react-testing-library`s `render` method returns `debug` function which does
exactly this.

By running `debug()` we'll have a pretty-printed result of our component
printed to the console in our tests. Passing in a queried element will
render only that element.

## 7. Test React Component Event Handlers with fireEvent from react-testing-library

```bash
$ npx jest favorite
```

We can trigger events on elements by using `react-testing-library`s
`fireEvent` export.

`fireEvent` has a number of event methods on it, such as `.change`,
`.click`, etc. that can be dispatched on an element. A second parameter
passes values through to the event handler.

## 8. Assert rendered text with react-testing-library

```bash
$ npx jest favorite
```

There are a number of ways we can assert that specific text exists in the
DOM.

The first is by using the `container` property exported by `render`, and
asserting it has text using `.toHaveTextContent`.

The second is by using the `getByText` query returned by `render` to
validate if an element exists. `getByText` throws an error if an element
can't be found. This is true for all the `get` methods returned by `render`.

The third is to use the `getByTestId` method that `render` exports along
with a `data-testid` attribute on the element whose content you want to
validate exists.

## 9. Test prop updates with `react-testing-library`

```bash
$ npx jest favorite
```

We can simulate prop updates to components using the `rerender` method
returned by `render`.

## 10. Assert that something is NOT rendered with `react-testing-library`

```bash
$ npx jest favorite
```

The `.get` methods returned from `render` throw errors if an element can't
be found in the DOM. This will result in tests erroring, even if we're
testing for the non-existence of elements.

To assert that elements do not exist, there are matching `.query` methods
that `render` returns that return `null` instead of throwing an error.

We can then use `expect(queryByX()).toBeFalsy()` to assert that the elements
don't exist.

## 11. Test accessibility of rendered React Components with jest-axe

```bash
$ npx jest form
```

[`__tests__/form.test.js`](./__tests__/form.test.js)

Using `jest-axe` we can assert the accessibility of our components.

The `axe` export from `jest-axe` is accepts a DOM node, and is async, so we
need tests containing a11y assertions to be `async / await`.

`jest-axe` also exports a `toHaveNoViolations` matcher which can either be
made avilable in assertions using `expect.extend(toHaveNoViolations)`, or
can be automatically extended on `expect` by importing
`jest-axe/extend-expect`.

## 12. Mock HTTP Requests with jest.mock in React Component Tests

```bash
$ npx jest greeting
```

[`__tests__/greeting-loader-mock-01.test.js`](./__tests__/greeting-loader-mock-01.test.js)

To test `async/await` we need to

1. import `wait` from `react-testing-libary` to assert `async` responses
2. mock the api function using `jest.mock` and `jest.fn` so that we can
   assert calls on the function
3. import the mocked api function so that we can use it for assertions
4. assert the response from calling the api response inside the callback
   that `wait` expects

## 13. Mock HTTP Requests with Dependency Injection in React Component Tests

```bash
$ npx jest greeting
```

[`__tests__/greeting-loader-mock-02.test.js`](./__tests__/greeting-loader-mock-02.test.js)

As an alternative to mocking, one can use dependency injection by setting
the api call as a default prop on the component, mocking it in the test, and
passing it through explicitly.

This technique requires having to change your implementation of your
component.

It's most useful when you're in an environment where you can't make use of
Jest's mocking capabilities, such as when in Storybook.

## 14. Mock react-transition-group in React Component Tests with jest.mock

```bash
$ npx jest hidden
```

[`__tests__/hidden-message.test.js`](./__tests__/hidden-message.test.js)

If we have components which rely on animations, it'd be a waste of time, as
well as frustrating, to have our tests wait for animations to complete in
order to run assertions.

To get around this, we can mock the implementation of external libraries to
remove any timeouts or delays.

## 15. Test componentDidCatch handler error boundaries with react-testing-library

```bash
$ npx jest error
```

[`__tests__/error-boundary.test.js`](./__tests__/error-boundary.test.js)

To test error boundaries in our `error-boundary.js` component we need to do
a few things:

1. mock out our API request
2. create a component that simulates an error being thrown
3. make our test output less cluttered by mocking out `console.error`
4. assert that `console.error` is being called the correct number of times,
   since we may be losing important information by squashing the output
5. assert that the `reportError` API call we mock is being called the
   correct number of times, and with the correct parameters
6. assert that our component is displaying the correct text when there's an
   error
7. assert that when there is no error that `renderError` is not called, and
   that our component does not output the error text

To mock out `console.error` we need to use `beforeEach` to mock it out
before each test runs, and restore it after each test using `afterEach`. To
create the mock we need to use Jest's `.spyOn` method along with
`.mockImplementation`:

```javascript
// silence console.error ouptut in our tests
jest.spyOn(console, 'error').mockImplementation(() => {})
```

First we render our component without any errors. We could, at this point,
assert that it's outputting as expected.

Then we `rerender` with an error, at which point we can assert that
`console.error` and `reportError` were called. We need to assert that
`renderError` was not only called, but called with the parameters that we
expect, using `.toHaveBeenCalledWith`.

Instead of matching literals, we can specify constructors for Jest to match
against. This prevents us from having to know exactly what to match against,
and instead provide something more abstract to match against.

```javascript
const error = expect.any(Error)
const info = {someProp: expect.stringContaining('foo')}
```

Once we've asserted that our component is correctly displaying and handling
function calls when there is an error, we can assert that it's working
without issue.

We should first reset our mocks so that we don't need to be concerned with
the previous number of calls and the parameters in those calls:

```javascript
console.error.mockReset()
mockReportError.mockReset()
```

We can then manually `rerender` our component without throwing an error. At this
stage our component's state is still unchanged, so it's still showing that
there was an error.

We can fire a click event on the button, which will cause a rerender,
allowing us to assert against a component without an error.

## 16. Test drive the development of a React Form with react-testing-library

```bash
$ npx jest post-editor-01
```

[`__tests__/post-editor-01-markup.test.js`](./__tests__/post-editor-01-markup.test.js)

Red, green, refactor.

Using the `.getBy` functions that `render` exports allows one to assert
that components are rendering without an explicit `expect`. This is because
if the components didn't exist, the `.getBy` functions would throw errors.

## 17. Test drive the submission of a React Form with react-testing-library

```bash
$ npx jest post-editor-02
```

[`__tests__/post-editor-02-markup.test.js`](./__tests__/post-editor-02-markup.test.js)

First add a test to ensure that after the submit button is clicked it is
disabled to prevent additional requests.

Once we have a failing test, update the component by adding a submit
handler, and setting the state so that the button is disabled after it is
clicked.

## 18. Test drive the API call of a React Form with react-testing-library

```bash
$ npx jest post-editor-03
```

[`__tests__/post-editor-03-markup.test.js`](./__tests__/post-editor-03-markup.test.js)

We need to assert that when the form is submitted that our API is called
to actually save the post.

We don't want to make the actual request, but we do want to confirm that
the function will be called and called with the correct parameters.

We need to:

1. mock the API call
2. import the mocked function so we can assert against it
3. clear the mock after each test so that it doesn't interfere with other
   tests we may add to the file
4. assert the number of times its called, and the payload it receives

To assert that it is called with the correct payload, we need to:

1. set the values on the inputs
2. get the values in the submit handler

To get the form values in the submit handler we use the name attribute on
fields, and extract the components from the `event`:

```javascript
const {name1, name2, name3} = event.target.elements;
const payload = {
  v1: name1.value,
  v2: name2.value,
  v3: name3.value,
};
```

## 19. Test drive mocking react-router’s Redirect component on a form submission

```bash
$ npx jest post-editor-04
```

[`__tests__/post-editor-04-markup.test.js`](./__tests__/post-editor-04-markup.test.js)

To mock `Redirect` from `react-router` we need to:

1. import `Redirect` from `react-router` so that we can assert on it
2. name `Redirect` as `MockRedirect` so that we can easily see that we're
  asserting on a mocked function
3. Use `jest.mock` to mock out `react-router` and specifically `Redirect`
4. Make our test async
5. Use `wait` from `react-testing-library` to assert that `MockRedirect`
  was indeed called
6. Assert that the redirect is called with the path we specify
7. clear our mocked redirect after every test runs to clean things up

`react-testing-library`'s `wait` executes each assertion every 15ms for 4s
for each assertion. If there are 4 assertions inside `wait`, and 1 of them
fails, we will only know after 16s.

It's best to keep the number of tests inside `wait` as low as possible to
ensure faster test runs.

## 20. Test drive assertions with dates in React

```bash
$ npx jest post-editor-05
```

[`__tests__/post-editor-05-markup.test.js`](./__tests__/post-editor-05-markup.test.js)

To assert something dynamic, such as a date, we can evaluate it against a
range. We can set a value before a test runs, and after the value to assert
is created, and then assert the value lies between those two values.

## 21. Use generated data in tests with test-data-bot to improve test maintainability

```bash
$ npx jest post-editor-06
```

[`__tests__/post-editor-06-markup.test.js`](./__tests__/post-editor-06-markup.test.js)

`test-data-bot` can be used to generate data to help indicate what is
important to test, vs what can be created on the fly.

## 22. Test drive error state with react-testing-library

```bash
$ npx jest post-editor-07
```

[`__tests__/post-editor-07-markup.test.js`](./__tests__/post-editor-07-markup.test.js)

To assert that dom nodes exist once errors are thrown from promises we need
a mechanism to retrieve the elements once the promise rejected and state
has been updated.

`react-testing-library`'s `waitForElement` does exactly this. We use
`await` to wait for `waitForElement` to retreive an element we request
inside its callback.

Once we have that element we can assert on it.

---

To simulate a rejection, we could change our `mockSavePost` implementation,
but this would cause other tests to then fail.

Instead, we can specify that the mock behave in a particular way inside the
test, and only once.

To have `mockSavePost` reject the promise, we use Jest's
`mockFn.mockRejectValueOnce` and provide a value that it will reject with.

```javascript
mockFn.mockRejectValueOnce({foo: 'bar'})
```

Jest provides a number of ways to handle what and how a function returns:

- `mockFn.mockReturnThis()`
- `mockFn.mockReturnValue(value)`
- `mockFn.mockReturnValueOnce(value)`
- `mockFn.mockResolvedValue(value)`
- `mockFn.mockResolvedValueOnce(value)`
- `mockFn.mockRejectedValue(value)`
- `mockFn.mockRejectedValueOnce(value)`

## 23. Write a custom render function to share code between tests and simplify tests

```bash
$ npx jest post-editor-08
```

[`__tests__/post-editor-08-markup.test.js`](./__tests__/post-editor-08-markup.test.js)

We can abstract common render behaviour to a function so that tests are
easier to read and write.

## 24. Test React components that use the react-router Router Provider with createMemoryHistory

```bash
$ npx jest main-01
```

[`__tests__/main-01.test.js`](./__tests__/main-01.test.js)-01

Components containing components from `react-router-dom` require context in
order for them to fucntion. This is provided through a `Router` in
applications, so we need to provide this to individual components in order
to test them.

There are two ways to do this, one using `Router` directly and passing in
`history` using the `history` module's `createMemoryHistory` function, and
the other by using `MemoryRouter` and providing `initialEntries` as a prop.

## 25. Initialize the `history` object with a bad entry to test the react-router no-match route

```bash
$ npx jest main-01
```

[`__tests__/main-01.test.js`](./__tests__/main-01.test.js)

To test routes that don't match in `react-router` one can either set
`initialEntries` in `createMemoryHistory` to an invalid path, or directly as
a prop on `MemoryRouter`.

## 26. Create a custom render function to simplify tests of react-router components

```bash
$ npx jest main-02
```

[`__tests__/main-02.test.js`](./__tests__/main-02.test.js)

There's a lot of duplication of rendering `Main` inside a `Router` component
configured with its own history in `main-01.test.js`.

If we wanted to test other components containing `Link` and `Route`
components we'd need to duplicate the effort again.

Instead, we can create a custom `render` function that does the work for us.
By allowing that function to accept any React component we can reuse the new
`render` function anywhere.

This new `render` can also be moved to a test utils file that can be
imported into tests and used ad-hoc where it makes sense.

## 27. Test a redux connected React Component

```bash
$ npx jest redux-app-01
```

[`__tests__/redux-app-01.test.js`](./__tests__/redux-app-01.test.js)

To test components that are connected via `react-redux`s `connect` function,
we need to create a store using `redux`s `createStore` function, and wrap
our component in `react-redux`s `Provider` component providing it with the
store we created.

By doing this we're not only testing our component, but we're validating
that our reducers and actions are working as expected - we're getting better
coverage by writing integration tests.

## 28. Test a redux connected React Component with initialized state

```bash
$ npx jest redux-app-02
```

[`__tests__/redux-app-02.test.js`](./__tests__/redux-app-02.test.js)

Initial redux state can be passed through to `createStore` as a second
parameter.

## 29. Create a custom render function to simplify tests of redux components

```bash
$ npx jest redux-app-03
```

[`__tests__/redux-app-03.test.js`](./__tests__/redux-app-03.test.js)

We can abstract the creation of a redux Provider, and set default parameters
such that a user may pass in their own `store` and initial state.

If the user doesn't provider their own `store` we create one using the full
reducer from the app.

## 30. Test a render prop component using a Jest mock function

```bash
$ npx jest toggle
```

[`__tests__/toggle.test.js`](./__tests__/toggle.test.js)

To test components that use the render prop strategy, we need to do a few
things:

1. create a `children` function that will be passed to the render prop that
   receives values from the render prop
2. maintain an object that contains the latest values passed to the
   `children` function.
3. assert on that object that the render prop component is doing what it
   should be

Most render prop components will use this same pattern, so we can abstract
this behaviour in a setup function that can be easily reused.

## 31. Test React portals with react-testing-library

```bash
$ npx jest modal
```

[`__tests__/modal.test.js`](./__tests__/modal.test.js)

Testing React Portals requires no changes to how we write tests. The only
difference is that when we query for elements in our tests, they will be
scoped to the full DOM.

If we want to scope our tests specifically to where the React Portal is
mounted, we can use `react-testing-library`s `within` and pass in the node
we want queries to be scoped to.

`within` returns the same `.query` and `.get` methods that render does, but
scoped to the node it is called with.

## 32. Test Unmounting a React Component with react-testing-library

```bash
$ npx jest countdown
```

When testing components that use timers, such as `setTimeout` and `setInterval`,
we don't want to be subject to the length of time those tiemrs take to execute.

To resolve this, Jest allows one to easily mock out timers using
`jest.useFakeTimers()`.

This alone isn't enough, as when running assertions when timers are running, we
may end up in a position where an assertion runs before a timer has executed its
callback.

To resolve this issue we need to wait for all pending timers to execute. Jest
offers 2 mechanisms to do this:

- `jest.runAllTimers()` - runs all pending timers. If, however, we have a
    recursive `setTimeout` calling itself, we'll end up in a loop
- `jest.runOnlyPendingTimers()` - this will run only the pending timers, and no
    other timers. This can be used for timers that call themselves recursively

### Evaluating different scenarios with timers

`countdown.test.js` is evaluated for each of the following.

#### Scenario 1

- no `clearInterval` in `componentWillUnmount`
- no `jest.useFakeTimers()`
- no `jest.runOnlyPendingTimers()`

**Result:** We get a false positive on `setState` not being called, because our
assertion runs before the last `setState` is actually called.

Evaluating `clearInterval` has been called, however, reveals that we're not
clearning any timers - a clear indication of a memory leak.

#### Scenario 2

- `clearInterval` in `componentWillUnmount`
- no `jest.useFakeTimers()`
- no `jest.runOnlyPendingTimers()`

**Result:** We still get a false positive, because we've done nothing about
ensuring that our timers have run.

`clearInterval` is at least showing that it's been called, so that's one step in
the right direction.

#### Scenario 3

- no `clearInterval` in `componentWillUnmount`
- `jest.useFakeTimers()`
- no `jest.runOnlyPendingTimers()`

**Result:** We still get a false positive, because we've done nothing about
ensuring that our timers have run.

The `clearInterval` assertion is still failing.

#### Scenario 3

- no `clearInterval` in `componentWillUnmount`
- no `jest.useFakeTimers()`
- `jest.runOnlyPendingTimers()`

**Result:** Still a false positive for setState, but Jest is now indicating that
we are not mocking timers - i.e., use `jest.useFakeTimers()`

#### Scenario 4

- `clearInterval` in `componentWillUnmount`
- `jest.useFakeTimers()`
- no `jest.runOnlyPendingTimers()`

**Result:** Our test is passing, but who knows if in another test run that our
timer will run after our assertion?

#### Scenario 5

- `clearInterval` in `componentWillUnmount`
- no `jest.useFakeTimers()`
- `jest.runOnlyPendingTimers()`

**Result:** Another false positive, and we get a warning from Jest that we're
not using `jest.useFakeTimers()`

#### Scenario 6

- `clearInterval` in `componentWillUnmount`
- `jest.useFakeTimers()`
- `jest.runOnlyPendingTimers()`

**Result:** Our tests pass, and we know that by using `jest.useFakeTimers()`
that `setInterval` is mocked, and that with `jest.runOnlyPendingTimers()` that
our assertion will only run once all remaining timers have run.
