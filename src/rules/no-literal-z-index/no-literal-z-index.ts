/* eslint-disable sonarjs/prefer-single-boolean-return */
import {
  utils,
  createPlugin,
  PostcssResult,
  Rule,
  Plugin,
} from 'stylelint';
import type { Root, Declaration } from 'postcss';

const ruleName = 'basic-rules/no-literal-z-index';
const messages = utils.ruleMessages(ruleName, {
  rejected: (value: string) =>
    `Unexpected literal z-index value "${value}". Use a CSS custom property (var(--…)) or a Sass variable instead.`,
});

const literalInt = /^-?\d[\d_]*$/u;

function isAllowed(value: string): boolean {
  if (/var\(--.+\)/.test(value)) return true;
  if (/^\$[\w-]+$/.test(value)) return true;
  if (value.trim() === 'auto') return true;
  if (/^calc\(.+\)$/u.test(value)) return true;

  return false;
}

const noLiteralZRuleFn: Rule<boolean, unknown> = (enabled = true) => {
  return (root: Root, result: PostcssResult) => {
    if (
      !utils.validateOptions(result, ruleName, {
        actual: enabled,
        possible: [true, false],
      })
    )
      return;

    root.walkDecls('z-index', (decl: Declaration) => {
      const value = decl.value.trim();

      if (!enabled) return;

      if (isAllowed(value)) return;

      if (literalInt.test(value)) {
        utils.report({
          node: decl,
          result,
          ruleName,
          message: messages.rejected(value),
          word: value,
        });
      }
    });
  };
};

noLiteralZRuleFn.ruleName = ruleName;
noLiteralZRuleFn.messages = messages;

const noLiteralZPlugin: Plugin = createPlugin(ruleName, noLiteralZRuleFn);

export default noLiteralZPlugin;
