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
