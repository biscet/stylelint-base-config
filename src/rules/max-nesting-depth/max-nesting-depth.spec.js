import plugin from './max-nesting-depth.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: 2,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '.foo { display: block; }',
      description: 'single-level selector (depth 1) - no nesting, should pass',
    },
    {
      code: '.nav {\n  .nav-item { color: blue; }\n}',
      description: 'two-level nesting (depth 2) - within allowed depth',
    },
  ],
  reject: [
    {
      code: '.nav {\n  .nav-item {\n    .sub-item { color: red; }\n  }\n}',
      description: 'three-level nesting (depth 3) - exceeds allowed depth of 2',
      message: messages.expected(2),
      line: 3,
      column: 5,
      endLine: 3,
      endColumn: 13,
    },
    {
      code: '.container {\n  .inner1 { padding: 0; }\n  .inner2 {\n    .deepest { color: yellow; }\n  }\n}',
      description: 'sibling blocks with a three-level nested selector (depth 3) - exceeds allowed depth of 2',
      message: messages.expected(2),
      line: 4,
      column: 5,
      endLine: 4,
      endColumn: 12,
    },
  ],
});
