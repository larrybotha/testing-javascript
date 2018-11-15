module.exports = {
  ...require('./test/jest.common'),

  // specify the configs to run at the same time
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
    './test/jest.lint.js',
  ],

  // only collect coverage for files found in the src folder
  // Include all files in coverage that may not have any tests, as by default
  // Jest creates coverage only for files that have tests.
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],

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
