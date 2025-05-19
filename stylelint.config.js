const customPlugins = require('./src/rules/max-nesting-depth/max-nesting-depth.js');

module.exports = {
  plugins: [
    customPlugins, 
  ],
  rules: {
    'basic-rules/max-nesting-depth': 3,
  },
};
