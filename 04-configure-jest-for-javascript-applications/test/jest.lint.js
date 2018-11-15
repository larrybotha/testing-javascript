const {rootDir} = require('./jest.common');

module.exports = {
  // lint files from the root directory
  rootDir,

  // name the project
  displayName: 'lint',

  // instead of running tests, we run our linter
  runner: 'jest-runner-eslint',

  // match all files in the root directory
  testMatch: ['<rootDir>/**/*.js'],

  // ignore files in the following folders
  testPathIgnorePatterns: ['node_modules', 'coverage', 'dist', 'other'],
};
