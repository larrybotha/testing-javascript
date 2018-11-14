module.exports = {
  ...require('./jest.common'),

  // add a displayName so we can easily differentiate these tests from other
  // tests when Jest is running multiple projects
  displayName: 'server',

  testEnvironment: 'jest-environment-node',
  coverageDirectory: '../../coverage/server',

  // match only files with '.test.server'
  testMatch: ['**/*.test.server.js'],
};
