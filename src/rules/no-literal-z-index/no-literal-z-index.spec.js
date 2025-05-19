import plugin from './no-literal-z-index.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: true,
  customSyntax: 'postcss-scss',
  accept: [
    {
      description: 'CSS custom property',
      code: '.modal { z-index: var(--layer-modal); }',
    },
    {
      description: 'Sass variable',
      code: '$z-dialog: 200;\n.dialog { z-index: $z-dialog; }',
    },
    {
      description: '`auto` keyword',
      code: '.sticky { z-index: auto; }',
    },
    {
      description: 'calc() expression',
      code: '.tooltip { z-index: calc(var(--layer-base) + 1); }',
    },
  ],
  reject: [
    {
      description: 'bare positive integer',
      code: '.bad { z-index: 1000; }',
      message: messages.rejected('1000'),
      line: 1,
      column: 17,
    },
    {
      description: 'negative integer',
      code: '.neg { z-index: -1; }',
      message: messages.rejected('-1'),
      line: 1,
      column: 17,
    },
  ],
});
