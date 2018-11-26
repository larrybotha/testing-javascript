# Test React Components with Jest and `react-testing-library`

Checkout individual branches for changes specific to that section of the course.

1. **Render a React component for testing**

   ```bash
   npx jest favorite
   ```

   To mount a React component we ReactDOM and a node on which to mount it. We
   can use `document.createElement('div')` to create a mount point, and then
   evaluate that `div`'s content using query selectors.

   `HTMLInputElement.type` returns the type of the input.

   `Node.textContent` returns the text inside a DOM node and its descendants.

   ***

   Note: No need to install `babel-jest` manually if using Babel 7 as it's already
   installed when Jest is installed (see `npx jest --showConfig`). To correctly
   transpile JSX you'll need `@babel/core` and `babel-core@7.0.0-bridge.0`.
   Tests will transpile JSX without any additional libraries or config.

2. **Use jest-dom for improved assertions**

   ```bash
   npx jest favorite
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

3. **Use dom-testing-library to write more maintainable React tests**

   ```bash
   npx jest favorite
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

4. **Use `react-testing-library` to render and test React Components**

   ```bash
   npx jest favorite
   ```

   If we abstract the rendering of our component, as well as getting all the
   queries for the container, to its own function, that function can be used to
   query all React components.

   Turns out, this is exactly what `react-testing-library` does!

5. **Avoid Memory leaks using react-testing-library’s cleanup function**

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

6. **Debug the DOM state during tests using react-testing-library’s debug
   function**

    It'd be convenient if one could inspect the result of rendering a React
    component.

    `react-testing-library`s `render` method returns `debug` function which does
    exactly this.

    By running `debug()` we'll have a pretty-printed result of our component
    printed to the console in our tests. Passing in a queried element will
    render only that element.

7. **Test React Component Event Handlers with fireEvent from react-testing-library**

    We can trigger events on elements by using `react-testing-library`s
    `fireEvent` export.

    `fireEvent` has a number of event methods on it, such as `.change`,
    `.click`, etc. that can be dispatched on an element. A second parameter
    passes values through to the event handler.

8. **Assert rendered text with react-testing-library**

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
