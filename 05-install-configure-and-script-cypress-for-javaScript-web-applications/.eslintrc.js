const path = require('path')

module.exports = {
  extends: [
    'kentcdodds',
    'kentcdodds/import',
    'kentcdodds/webpack',
    'kentcdodds/jest',
    'kentcdodds/react',
  ],

  // eslint complains about the cypress generated tests, so we can add a plugin
  // to address that
  plugins: ['eslint-plugin-cypress'],
  // we also make cypress' globals known to eslint
  env: {'cypress/globals': true},
  overrides: [
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
