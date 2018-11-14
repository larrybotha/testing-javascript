module.exports = {
  // spread common configs
  ...require('./jest.common'),

  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: '../../coverage',

  // a test setup file that is run once Jest is loaded. Required if we need test
  // preparation that requires Jest, such as adding snapshot serialisers to all
  // tests
  setupTestFrameworkScriptFile: require.resolve('./setup-tests.js'),

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
    'src/utils.js': {
      statements: 100,
      branches: 80,
      lines: 100,
      functions: 100,
    },
  },
};
