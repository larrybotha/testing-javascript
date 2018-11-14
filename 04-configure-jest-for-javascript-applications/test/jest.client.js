module.exports = {
  // spread common configs
  ...require('./jest.common'),

  // add a displayName so we can easily differentiate these tests from other
  // tests when Jest is running multiple projects
  displayName: 'dom',

  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: '../../coverage',

  // a test setup file that is run once Jest is loaded. Required if we need test
  // preparation that requires Jest, such as adding snapshot serialisers to all
  // tests
  setupTestFrameworkScriptFile: require.resolve('./setup-tests.js'),
};
