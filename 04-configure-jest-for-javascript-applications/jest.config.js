module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // identity-obj-proxy is useful for mocking webpack imports.
    // Based on the import, it'll output something more valuable than a simple
    // module.exports = {}
    '\\.module\\.css': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
};
