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

8. [Handle Dynamic Imports using Babel with Jest](./08.test.js)

   ```bash
   $ npx jest 08
   ```

   Dynamic imports are made possible in JS through webpack, but they are not a
   feature of Node. Because Node doesn't support dynamic imports, our tests are
   going to fail as soon as they come across any of them.

   To resolve this we need to configure `babel` to transform them. We only want
   this done when tests are run, as Webpack should be left responsible handling
   dynamic imports for dev and production.

9. [Setup an afterEach Test Hook for all tests with Jest setupTestFrameworkScriptFile](./09.test.js)

   ```bash
   $ npx jest 09
   ```

   We have a lot of repetition in our tests, where we have the cleanup imported
   in each file, and we'd likely want to use the `emotion` serialiser in other
   components, too.

   We can abstract the common code to a single file, and then import that into
   each file, but Jest has a more effective way to run code for all tests.

   There are 2 ways to configure Jest to automatically import code into tests:

   1. `setupFiles` - this is an array of files that are run _before Jest is
      loaded_. This is useful for anything that doesn't need Jest to be loaded.
   2. `setupTestFrameworkScriptFile` - a path to a file that we want run once
      Jest has loaded. This file is needed if we are going to do things like add
      snapshot serialisers, mocks, etc.

10. [Support custom module resolution with Jest moduleDirectories](./10.test.js)

    ```bash
    $ npx jest 10
    ```

    In Webpack one can use the `resolve.modules` property to configure Webpack
    to evaluate paths in addition to `node_modules` to import modules. This is
    useful on large projects, and allows one to specify imports without
    incredibly long or tedious local import paths.

    This, however, will not work in Jest by default, because a module import
    will fail if the file is actually found locally. An example of this is in
    [`calculator.js`](./src/calculator.js) where `loadable` is being used to
    import `calculator-display` dynamically, but as if it were a module.

    To address this, one can use `moduleDirectories` in the Jest config.
    `moduleDirectories` is isomorphic to Webpack's `resolve.modules`, allowing
    module imports to resolve for local files.

    ***

    `loadable` has a `preloadAll` method which can be used in async tests to
    load all dynamic modules. Without preloading the dynamic imports our
    components with dynamic imports will output the loading content.

    We can use `react-testing-library`s `debug` method that `render` returns to
    evaluate the `container` that render also returns.

11. [Support a test utilities file with Jest moduleDirectories](./11.test.js)

    ```bash
    $ npx jest 11
    ```

    For components that are wrapped in Consumers to get data we need to wrap
    them in Providers in our tests.

    We can abstract the repetitive wrapping to its own function, and to its own
    file that can be imported into the relevant tests.

    Furthermore, we can make the test utility file accessible by adding the path
    containing the utility to Jest's `moduleDirectories`, making it easier to
    access the utility.

    On top of that, we can export all of `react-testing-library` from that file,
    mititigating the need to import both the utility and `react-testing-library`
    into our test, and can override `react-testing-library`s `render` function
    so that our tests look the same, while benefitting from being wrapped in
    Providers automatically.

    ***

    Using Jest's `moduleDirectories` will result in eslint not being able to
    lint files, and catch errors like typos in imports.

    To fix this we can add a resolver for eslint:

    ```bash
    $ npm i -D eslint-import-resolver-jest
    ```

    In our eslint config we can now add an override to allow eslint to properly
    evaluate imports using our Jest config:

    ```javascript
    // eslintrc.js
    ...
      overrides: [
        {
          files: ['**/*.test.js'],
          settings: {
            'import/resolver': {
              jest: {
                jestConfigFile: path.join(__dirname, './jest.config.js'),
              },
            },
          },
        },
      ],
    ...
    ```

    eslint then uses Jest's `moduleDirectories` to resolve modules

12. Step through Code in Jest using the Node.js Debugger and Chrome DevTools

    Jest runs tests in parallel by default. We can instruct Jest to in a single
    thread using the `--runInBand` flag to speed up debugging.

13. Configure Jest to report code coverage on project files

    ```bash
    $ npx jest --coverage
    ```

    Running coverage indicates how much of your codebase has had tests written
    for it.

    Jest generates coverage files in a `coverage` folder, which should not be
    committed to the project.

    Running the generated files with a server will allow one to inspect exactly
    where coverage is required:

    ```bash
    $ npx jest --coverage && cd coverage/lcov-report && npx serve
    ```

    ***

    Be default Jest will run coverage only for files included in our tests, and
    including tests.

    We don't want to know coverage for our tests, so we can configure Jest to
    collect coverage only from specific files, using `collectCoverageFrom` in
    `jest.config.js`, passing an array of paths that should be evaluated for
    coverage.

    `collectCoverageFrom` also indicates to Jest to include everything that may
    not even have a test file.

14. Analyze Jest Code Coverage Reports

    Jest uses Istanbul for generating coverage.
