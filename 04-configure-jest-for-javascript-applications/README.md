# Configure Jest for Testing JavaScript Applications

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [1. Install and run Jest](#1-install-and-run-jest)
- [2. Transpile modules with babel in Jest tests](#2-transpile-modules-with-babel-in-jest-tests)
- [3. Configure Jest’s test environment for testing node or browser code](#3-configure-jests-test-environment-for-testing-node-or-browser-code)
- [4. Support importing CSS files with Jest’s moduleNameMapper](#4-support-importing-css-files-with-jests-modulenamemapper)
- [5. Support using webpack CSS modules with Jest](#5-support-using-webpack-css-modules-with-jest)
- [6. Generate a Serializable Value with Jest Snapshots](#6-generate-a-serializable-value-with-jest-snapshots)
- [7. Test an Emotion Styled UI with Custom Jest Snapshot Serializers](#7-test-an-emotion-styled-ui-with-custom-jest-snapshot-serializers)
- [8. Handle Dynamic Imports using Babel with Jest](#8-handle-dynamic-imports-using-babel-with-jest)
- [9. Setup an afterEach Test Hook for all tests with Jest setupTestFrameworkScriptFile](#9-setup-an-aftereach-test-hook-for-all-tests-with-jest-setuptestframeworkscriptfile)
- [10. Support custom module resolution with Jest moduleDirectories](#10-support-custom-module-resolution-with-jest-moduledirectories)
- [11. Support a test utilities file with Jest moduleDirectories](#11-support-a-test-utilities-file-with-jest-moduledirectories)
- [12. Step through Code in Jest using the Node.js Debugger and Chrome DevTools](#12-step-through-code-in-jest-using-the-nodejs-debugger-and-chrome-devtools)
- [13. Configure Jest to report code coverage on project files](#13-configure-jest-to-report-code-coverage-on-project-files)
- [14. Analyze Jest Code Coverage Reports](#14-analyze-jest-code-coverage-reports)
- [15. Set a code coverage threshold in Jest to maintain code coverage levels](#15-set-a-code-coverage-threshold-in-jest-to-maintain-code-coverage-levels)
- [16. Report Jest Test Coverage to Codecov through TavisCI](#16-report-jest-test-coverage-to-codecov-through-tavisci)
- [17. Use Jest Watch Mode to speed up development](#17-use-jest-watch-mode-to-speed-up-development)
- [18. Run Jest Watch Mode by default locally with is-ci-cli](#18-run-jest-watch-mode-by-default-locally-with-is-ci-cli)
- [19. Filter which Tests are Run with Typeahead Support in Jest Watch Mode](#19-filter-which-tests-are-run-with-typeahead-support-in-jest-watch-mode)
- [20. Run tests with a different configuration using Jest’s `--config` flag and testMatch option](#20-run-tests-with-a-different-configuration-using-jests---config-flag-and-testmatch-option)
- [21. Support Running Multiple Configurations with Jest’s Projects Feature](#21-support-running-multiple-configurations-with-jests-projects-feature)
- [22. Test specific projects in Jest Watch Mode with jest-watch-select-projects](#22-test-specific-projects-in-jest-watch-mode-with-jest-watch-select-projects)
- [23. Run ESLint with Jest using jest-runner-eslint](#23-run-eslint-with-jest-using-jest-runner-eslint)
- [24. Run only relevant Jest tests on git commit to avoid breakages](#24-run-only-relevant-jest-tests-on-git-commit-to-avoid-breakages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Install and run Jest

[01.test.js](./01.test.js)

```bash
$ npx jest 01
```

## 2. Transpile modules with babel in Jest tests

[02.test.js](./02.test.js)

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

## 3. Configure Jest’s test environment for testing node or browser code

[03.test.js](./03.test.js)

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

## 4. Support importing CSS files with Jest’s moduleNameMapper

[04.test.js](./04.test.js)

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

## 5. Support using webpack CSS modules with Jest

[05.test.js](./05.test.js)

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

## 6. Generate a Serializable Value with Jest Snapshots

[06.test.js](./06.test.js)

```bash
$ npx jest 06
```

Jest's `.toMatchSnapshot` serialises objects and evaluates changes to
objects.

`react-testing-library`'s `container` property on the return value of
`render` always wraps components in a div. If you want to evaluate your
component exclusively, you should use `container.firstChild`

## 7. Test an Emotion Styled UI with Custom Jest Snapshot Serializers

[07.test.js](./07.test.js)

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

## 8. Handle Dynamic Imports using Babel with Jest

[08.test.js](./08.test.js)

```bash
$ npx jest 08
```

Dynamic imports are made possible in JS through webpack, but they are not a
feature of Node. Because Node doesn't support dynamic imports, our tests are
going to fail as soon as they come across any of them.

To resolve this we need to configure `babel` to transform them. We only want
this done when tests are run, as Webpack should be left responsible handling
dynamic imports for dev and production.

## 9. Setup an afterEach Test Hook for all tests with Jest setupTestFrameworkScriptFile

[09.test.js](./09.test.js)

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

## 10. Support custom module resolution with Jest moduleDirectories

[10.test.js](./10.test.js)

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

## 11. Support a test utilities file with Jest moduleDirectories

[11.test.js](./11.test.js)

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

## 12. Step through Code in Jest using the Node.js Debugger and Chrome DevTools

Jest runs tests in parallel by default. We can instruct Jest to in a single
thread using the `--runInBand` flag to speed up debugging.

## 13. Configure Jest to report code coverage on project files

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

## 14. Analyze Jest Code Coverage Reports

Jest uses Istanbul for generating coverage.

## 15. Set a code coverage threshold in Jest to maintain code coverage levels

```bash
$ npx jest --coverage
```

We can ocnfigure Jest to enforce code coverage levels. This is useful in CI
to prevent builds / deployments if code coverage begins to suffer.

In Jest's config we use the `coverageThreshold` property to configure our
thresholds.

***

Not all lines are as valuable to have coverage for as others. To address
this we can add globs as properties to the `coverageThreshold` property with
fine-grained thresholds.

## 16. Report Jest Test Coverage to Codecov through TavisCI

Using `npx` we can run the `codecov` binary to send code coverage reports to
codecov.io

In `.travis.yml` we can use the `after_script` property to instruct Travis
what to do once tests pass. This is when we'd want to run the `codecov`
binary.

## 17. Use Jest Watch Mode to speed up development

Jest's `--watch` mode watches files for changes, and puts tests into
interactive mode.

Jest watches for files that have been modified in Git, and runs tests
against changed files.

Interactive mode commands:

- `u` update all failed snapshots
- `i` interactively update failed snapshots
  - `u` update the current snapshot
  - `s` skip the current snapshot
  - `q` quit interactive snapshot updating
- `f` run only failing tests
- `a` run all tests
- `o` run tests only for files that are modified
- `p` filter by filename regex pattern
  - `c` clear filters
- `t` filter by test name regex pattern. This behaves in a similar way to
  using `test.only` to run only specified tests
- `Enter` rerun the current tests

## 18. Run Jest Watch Mode by default locally with is-ci-cli

Instead of running `nom run test:watch` locally and `npm test` on CI, we can
use `is-ci-cli` to run one script or another, based on whether we are in a
CI environment or not:

```json
...
"scripts": {
  "my-script": "is-ci 'my-ci-script' 'my-local-script'",
  "my-local-script": ...,
  "my-ci-script": ...
},
...
```

## 19. Filter which Tests are Run with Typeahead Support in Jest Watch Mode

Being able to use `p` and `t` in Jest's `watch` mode is useful, but we can
get even better feedback using `jest-watch-typeahead`.

`jest-watch-typeahead` is a plugin for `watch` which can be installed and
then configured under the `watchPlugins` entry in `jest.config.js`

## 20. Run tests with a different configuration using Jest’s `--config` flag and testMatch option

Jest allows one to run specific configs using its `--config` flag. This
allows us to easily run separate configs for client-side and server-side
code.

By default Jest uses the config directory as the root directory to find
tests to run.

Because we've now moved our configs to a subfolder Jest will no longer be
able to find test files. To address this Jest allows for a `rootDir` prop to
be set in configs, which it will use as the root.

## 21. Support Running Multiple Configurations with Jest’s Projects Feature

Jest allows multiple configurations to be run at the same time:

```bash
$ npx jest --projects test/jest.client.js test/jest.server.js

# or
$ npx jest --projects test/jest.client.js test/jest.server.js --watch

# or
$ npx jest --projects test/jest.client.js test/jest.server.js --coverage
```

This allows one to eliminate the large number of test scripts building up in
`package.json`.

Jest's `projects` property in the config accepts an array of configs to run
at the same time.

To view a specific config in its entirety, one can run Jest with the
`--showConfig` flag:

```bash
$ npx jest  --config test/jest.client.js --showConfig
```

Outputting this we can see a `project` configuration property, which will be
applied specifically to that config, and a `global` property, which will be
applied to all configs.

To make it more clear which config is running which tests, we can add a
`displayName` property to each project config. When tests are run, they are
output with their `displayName`s prepended.

In `package.json` we no longer need to run separate scripts for our tests
because Jest will be running multiple projects.

## 22. Test specific projects in Jest Watch Mode with jest-watch-select-projects

Jest's `projects` property allows us to run multiple configs at the same
time, but if we only want to run tests for a single project we have to go
back to the command line and run only that project.

Using the `jest-watch-select-projects` plugin we get a new `P` command in
`--watch` mode that allows us to toggle projects, allowing us to run only
the projects we're interested in.

## 23. Run ESLint with Jest using jest-runner-eslint

Jest is not just a test runner, but a task running platform. It can be used
to run linting on files, and even run tests on files of other languages. At
the time of writing this there are test runners for both Go and Python.

To run tasks other than testing, we can create a new config which we add to
the `projects` property in our Jest config.

In this config we specify a new runner, specifically `jest-runner-eslint`,
to lint our files.

## 24. Run only relevant Jest tests on git commit to avoid breakages

Jest has a `--findRelatedTests` flag that will find all files related to a
specific test. This can be used to speed up tests if only a few files have
changed.

Knowing which files have changed takes time, but we can leverage `husky` and
`lint-staged` to evaluate these files dynamically.

`husky` allows us to configure git hooks, and `lint-staged` allows us to run
commands on staged files. If those commands pass when a commit is attempted,
the commit will be made, otherwise the commit will be prevented.

To configure this, we need a precommit hook. We add this as a script to
`package.json`:

```json
...
scripts: {
  ...
  "precommit": "lint-staged",
  ...
}
...
```

We instruct `husky`, via our `precommit` script, to run `lint-staged`.

In a `lint-staged.config.js` we can pass a list of files directly to Jest to
have only those tests run before the commit is made:

```javascript
...
  '**/*.js': 'jest --findRelatedTests',
...
```

Jest will run tests on only the staged js files, as passed to it by
`lint-staged`, triggered by our `precommit` hook that is run by `husky`.
