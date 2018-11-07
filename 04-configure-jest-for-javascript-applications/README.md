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
