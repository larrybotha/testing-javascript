const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // identity-obj-proxy is useful for mocking webpack imports.
    // Based on the import, it'll output something more valuable than a simple
    // module.exports = {}
    '\\.module\\.css': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },

  // for snapshot serialisers that initialise themselves, we can add them to our
  // jest config
  snapshotSerializers: [
    // This serialiser removes absolute paths and replaces them with normalised
    // paths. This is useful when different devs have different paths on their
    // systems, and you need to resolve differences in all the snapshots.
    // 'jest-serializer-path',
  ],

  // an array of files that will be run before Jest initialises, and that don't
  // need Jest in order to function
  setupFiles: [],

  // a test setup file that is run once Jest is loaded. Required if we need test
  // preparation that requires Jest, such as adding snapshot serialisers to all
  // tests
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),

  // this is isomorphic to webpack's resolve.modules property, allowing Jest to
  // resolve module imports that are outside of the node_modules directory
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],

  // only collect coverage for files found in the src folder
  // Include all files in coverage that may not have any tests, as by default
  // Jest creates coverage only for files that have tests.
  collectCoverageFrom: ['src/**/*.js'],

  coverageThreshold: {
    global: {
      // expect 100% coverage everywhere
      // statements: 100,
      // branches: 100,
      // lines: 100,
      // functions: 100,

      statements: 17,
      branches: 4,
      lines: 17,
      functions: 20,
    },
    // set thresholds specifically for utils.js
    './src/utils.js': {
      statements: 100,
      branches: 80,
      lines: 100,
      functions: 100,
    },
  },
};
