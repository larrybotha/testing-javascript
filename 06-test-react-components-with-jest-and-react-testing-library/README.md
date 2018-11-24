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
