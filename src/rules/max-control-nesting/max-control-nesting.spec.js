import plugin from './max-control-nesting.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: 1,
  customSyntax: 'postcss-scss',
  accept: [
    {
      description: 'single @if',
      code: '.x { @if $cond { color: red; } }',
    },
    {
      description: '@each containing @if (depth 1)',
      code: `
        @each $c in red, blue {
          .item-#{ $c } {
            @if $c == red { color: red; }
          }
        }`,
    },
  ],
  reject: [
    {
      description: 'nested depth 2 (@for > @if > @each)',
      code: `
        @for $i from 1 through 3 {
          @if $i > 1 {
            @each $c in red, blue { .x{} }
          }
        }`,
      message: messages.exceeded(2, 1),
      line: 4,
      column: 13,
    },
    {
      description: 'three-level nesting',
      code: `
        @while true {
          @each $c in red {
            @if $c { .y{} }
          }
        }`,
      message: messages.exceeded(2, 1),
      line: 4,
      column: 13,
    },
  ],
});
