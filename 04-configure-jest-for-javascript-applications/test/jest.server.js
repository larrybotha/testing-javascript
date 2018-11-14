module.exports = {
  ...require('./jest.common'),
  testEnvironment: 'jest-environment-node',
  coverageDirectory: '../../coverage/server',

  // match only files with '.test.server'
  testMatch: ['**/*.test.server.js'],
};
