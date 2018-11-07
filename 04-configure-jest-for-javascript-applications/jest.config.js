module.exports = {
  // To run Jest without jsdom, we use jest-environment-node
  // testEnvironment: 'jest-environment-node',
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // attempting to import .css files with Node will error, because Node
    // expects the files to be Node modules.
    // To get around this, we configure Jest to resolve to a file we specify
    // whenever a file ends in .css
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
};
