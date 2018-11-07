# Configure Jest for Testing JavaScript Applications

1. [Install and run Jest](./01-install-and-run-jest.test.js)

   ```bash
   $ npx jest 01
   ```

2. [Transpile modules with babel in Jest tests](./02-transpile-modules-with-babel-in-jest-tests.test.js)

   ```bash
   $ npx jest 02
   ```

   To ensure that Jest runs against commonjs Javascript and not ES6, mitigating
   `import` errors, we need to configure `@babel/preset-env` for the `test`
   environment in `.babelrc.js`.

   Jest automatically runs with `NODE_ENV` set to `test`.
