const customPlugins = require('./dist/index.js').default;

module.exports = {
  plugins: [
    ...customPlugins, 
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'basic-rules/max-nesting-depth': 2,
  },
};
