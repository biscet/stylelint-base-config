const customPlugin = require('./test.plugin.js');

module.exports = {
  plugins: [
    customPlugin, 
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'basic-rules/no-important-except-utilities': true,
  },
};
