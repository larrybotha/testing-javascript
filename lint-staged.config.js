module.exports = {
  linters: {
    // run doctoc only on changed markdown files
    '**/*.md': ['doctoc --github', 'git add'],
  },
};
