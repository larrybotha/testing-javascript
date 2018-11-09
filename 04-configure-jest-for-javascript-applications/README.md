# Configure Jest for Testing JavaScript Applications

1. [Install and run Jest](./01.test.js)

   ```bash
   $ npx jest 01
   ```

2. [Transpile modules with babel in Jest tests](./02.test.js)

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

3. [Configure Jest’s test environment for testing node or browser code](./03.test.js)

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

4. [Support importing CSS files with Jest’s moduleNameMapper](./04.test.js)

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

   This can be usef for svg, graphql, or any other non-node module imports.

5. [Support using webpack CSS modules with Jest](./05.test.js)

   ```bash
   $ npx jest 05
   ```

   CSS modules are converted into objects, but our initial styles mock in the
   Jest config returns an empty ojbect always, resulting in components importing
   the CSS as modules always having classNames of `undefined`.

   It'd be more valuable to have some indication that the CSS import is doing
   something. To do so, we can use `identity-obj-proxy` which is specifically
   built to improve mocking of imports.

   `moduleNameMapper` is order-dependent, so we add a test to match for
   `.module.css` before `.css`, which then results in `identity-obj-proxy`
   outputting a more meaningful class on our component which we can then test
   for.

6. [Generate a Serializable Value with Jest Snapshots](./06.test.js)

   ```bash
   $ npx jest 06
   ```

   Jest's `.toMatchSnapshot` serialises objects and evaluates changes to
   objects.

   `react-testing-library`'s `container` property on the return value of
   `render` always wraps components in a div. If you want to evaluate your
   component exclusively, you should use `container.firstChild`

7. [Test an Emotion Styled UI with Custom Jest Snapshot Serializers](./07.test.js)

   ```bash
   $ npx jest 07
   ```

   The snapshot generated in the previous exercise is not too useful, as we're
   getting a generated classname from `emotion`. When the CSS changes, we get a
   new classname, but we have no idea what that actually means.

   Jest serialisers allow one to modify how different tests are serialized. In
   the case of `emotion` we can use `jest-emotion`'s serializer to output the
   actual CSS in our snapshot, revealing the implication of the updated
   snapshot.

   Other snapshot serializers, such as `jest-serializer-path`, can be used to
   modify snapshots. `jest-serializer-path` normalises absolute paths to project
   root to prevent conflicts between different devs' systems.
