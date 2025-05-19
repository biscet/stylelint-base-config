import plugin from './no-hardcoded-colors.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: true,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '.card { color: var(--text-color); }',
      description: 'Uses CSS custom property — allowed',
    },
    {
      code: '$primary: #ff0000;\n.button { background: $primary; }',
      description: 'Uses SCSS variable — allowed',
    },
  ],
  reject: [
    {
      code: '.title { color: #ff0000; }',
      description: 'Hard-coded HEX color',
      message: messages.rejected('#ff0000'),
      line: 1,
      column: 17,
    },
    {
      code: '.alert { background: red; }',
      description: 'Hard-coded keyword color',
      message: messages.rejected('red'),
      line: 1,
      column: 25,
    },
  ],
});
