const customPlugin = require('./test.plugin.js');

module.exports = {
  plugins: [
    customPlugin, 
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'basic-rules/max-control-nesting': 1,
  },
};
