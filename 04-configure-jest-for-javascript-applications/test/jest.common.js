const path = require('path');

module.exports = {
  // Jest will use the config's location as the root directory to find files to
  // run tests against. Because we're now in ./test it won't find any files.
  // We need to configure Jest's rootDir to look from one directory up
  rootDir: path.join(__dirname, '..'),

  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // identity-obj-proxy is useful for mocking webpack imports.
    // Based on the import, it'll output something more valuable than a simple
    // module.exports = {}
    '\\.module\\.css': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
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

  // this is isomorphic to webpack's resolve.modules property, allowing Jest to
  // resolve module imports that are outside of the node_modules directory
  moduleDirectories: ['node_modules', path.join(__dirname, '../src'), 'shared'],

  // add a list of plugins to extend watch, which is plugable
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
};
