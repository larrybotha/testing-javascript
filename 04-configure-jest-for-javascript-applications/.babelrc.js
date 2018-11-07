module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false},
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
