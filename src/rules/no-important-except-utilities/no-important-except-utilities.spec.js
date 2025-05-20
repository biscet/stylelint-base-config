import plugin from './no-important-except-utilities.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: true,
  customSyntax: 'postcss-scss',
  accept: [
    {
      description: 'utility class with !important',
      code: '.u-hidden { display: none !important; }',
    },
    {
      description: 'normal class without !important',
      code: '.card { padding: 16px; }',
    },
  ],
  reject: [
    {
      description: 'component class with !important',
      code: '.btn { color: red !important; }',
      message: messages.rejected,
      line: 1,
      column: 22,
    },
    {
      description: 'mixed selector list; only part is .u-',
      code: '.u-hidden, .modal { display: none !important; }',
      message: messages.rejected,
      line: 1,
      column: 39,
    },
  ],
});
