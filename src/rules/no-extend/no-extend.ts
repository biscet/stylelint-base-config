import {
  utils,
  createPlugin,
  PostcssResult,
  Rule,
  Plugin,
} from 'stylelint';
import type { Root, AtRule } from 'postcss';

const ruleName = 'basic-rules/no-extend';
const messages = utils.ruleMessages(ruleName, {
  rejected: '@extend is not allowed; use mixins or utilities instead.',
});

const noExtendRuleFn: Rule<boolean, unknown> = (enabled = true) => {
  return (root: Root, result: PostcssResult) => {
    if (
      !utils.validateOptions(result, ruleName, {
        actual: enabled,
        possible: [true, false],
      })
    )
      return;

    if (!enabled) return;

    root.walkAtRules('extend', (atRule: AtRule) => {
      utils.report({
        node: atRule,
        result,
        ruleName,
        message: messages.rejected,
        word: '@extend',
      });
    });
  };
};

noExtendRuleFn.ruleName = ruleName;
noExtendRuleFn.messages = messages;

const noExtendPlugin: Plugin = createPlugin(ruleName, noExtendRuleFn);

export default noExtendPlugin;
