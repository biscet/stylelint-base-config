import plugin from './no-extend.js';

const { ruleName, messages } = plugin;

testRule({
  plugins: [plugin],
  ruleName,
  config: true,
  customSyntax: 'postcss-scss',
  accept: [
    {
      description: 'No @extend here',
      code: '.btn { @include button-base; }',
    },
  ],
  reject: [
    {
      description: 'Single @extend',
      code: '.danger { @extend .btn; }',
      message: messages.rejected,
      line: 1,
      column: 11,
    },
    {
      description: '@extend inside nested rule',
      code: `
        .card {
          .title {
            @extend %heading-lg;
          }
        }`,
      message: messages.rejected,
      line: 4,
      column: 13,
    },
  ],
});
