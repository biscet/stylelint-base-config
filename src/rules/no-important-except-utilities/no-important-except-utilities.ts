import {
  utils,
  createPlugin,
  PostcssResult,
  Rule,
  Plugin,
} from 'stylelint';
import type { Root, Declaration, Rule as PostcssRule } from 'postcss';

const ruleName = 'basic-rules/no-important-except-utilities';
const messages = utils.ruleMessages(ruleName, {
  rejected: '!important is allowed only in selectors prefixed with ".u-".',
});

function isUtility(rule: PostcssRule): boolean {
  return rule.selectors?.every((sel) => sel.trim().startsWith('.u-')) ?? false;
}

const noImportantExceptUtilities: Rule<boolean, unknown> = (enabled = true) => {
  return (root: Root, result: PostcssResult) => {
    if (
      !utils.validateOptions(result, ruleName, {
        actual: enabled,
        possible: [true, false],
      })
    )
      return;

    if (!enabled) return;

    root.walkRules((cssRule) => {
      const utilOk = isUtility(cssRule);

      cssRule.walkDecls((decl: Declaration) => {
        if (decl.important && !utilOk) {
          utils.report({
            node: decl,
            result,
            ruleName,
            message: messages.rejected,
            word: '!important',
          });
        }
      });
    });
  };
};

noImportantExceptUtilities.ruleName = ruleName;
noImportantExceptUtilities.messages = messages;

const noImportantPlugin: Plugin = createPlugin(
  ruleName,
  noImportantExceptUtilities,
);

export default noImportantPlugin;
