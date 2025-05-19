const customPlugin = require('./test.plugin.js');

module.exports = {
  plugins: [
    customPlugin, 
  ],
  rules: {
    'basic-rules/no-literal-z-index': true,
  },
};
