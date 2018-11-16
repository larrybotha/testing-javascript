module.exports = {
  linters: {
    // **/*.js will be passed to --findRelatedTests
    '**/*.js': ['jest --findRelatedTests'],
  },
};
