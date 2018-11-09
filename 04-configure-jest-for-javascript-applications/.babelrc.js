const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'emotion',
    isTest ? 'babel-plugin-dynamic-import-node' : null,
  ].filter(Boolean),
};
