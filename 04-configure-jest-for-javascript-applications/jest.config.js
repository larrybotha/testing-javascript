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
};
