# Configure Jest for Testing JavaScript Applications

1. [Install and run Jest](./01-install-and-run-jest.test.js)

   ```bash
   $ npx jest 01
   ```

2. [Transpile modules with babel in Jest tests](./02-transpile-modules-with-babel-in-jest-tests.test.js)

   ```bash
   $ npx jest 02
   ```

   Setting `@babel/preset-env.modules` to `false` in `.babelrc.js` prevents
   transpiling of our code, so that tools like webpack can use tree shaking
   before transpilation. For tests we want modules transformed so that we don't
   get ES6 errors.

   We want our tests transpiled to commonjs before Jest evaluates them. In
   `.babelrc.js` we can check if we are in the test environment; if so, we
   configure modules to `commonjs` for `@babel/preset-env`, otherwise disable
   module transpilation entirely.

   Jest automatically runs with `NODE_ENV` set to `test`.

   We didn't need to configure Jest at all. Jest picks up our `babelrc.js` and
   uses that to run tests.

3. [Configure Jest’s test environment for testing node or browser code](./03-configure-jest-test-environment-for-node-or-browser.test.js)

   ```bash
   $ npx jest 03
   ```

   Jest automatically requires `jsdom` to make `window` accessible in our tests.
   This is useful, but if we're in a Node environment, then we're taking a
   performance hit by loading a module that we likely don't need.

   We can configure whether `jsdom` is loaded or not by making use of the
   `testEnvironment` property in `jest.config.js`, or by running Jest with a
   flag:

   ```bash
   $ npx jest 03 --env=node

   # or
   $ npm t -- --env=node
   ```

4. [Support importing CSS files with Jest’s moduleNameMapper](./04-support-importing-css-files-with-module-name-mapper.test.js)

   ```bash
   $ npx jest 04
   ```

   Importing `.css` and other asset files into Javascript files is non-standard
   JS, and one of the reasons behind using loaders in webpack.

   When running our tests, Node knows nothing about the `.css` import in
   `auto-scaling-text.js`, and simply expects it to be a node module, which it
   isn't.

   To get around this, we can configure Jest to import files we specify using
   `moduleNameMapper` in `jest.config.js`.
