"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stylelint = require("stylelint");
const ruleName = 'basic-rules/no-important-except-utilities';
const messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: '!important is allowed only in selectors prefixed with ".u-".'
});
function isUtility(rule) {
  return rule.selectors?.every(sel => sel.trim().startsWith('.u-')) ?? false;
}
const noImportantExceptUtilities = (enabled = true) => {
  return (root, result) => {
    if (!_stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })) return;
    if (!enabled) return;
    root.walkRules(cssRule => {
      const utilOk = isUtility(cssRule);
      cssRule.walkDecls(decl => {
        if (decl.important && !utilOk) {
          _stylelint.utils.report({
            node: decl,
            result,
            ruleName,
            message: messages.rejected,
            word: '!important'
          });
        }
      });
    });
  };
};
noImportantExceptUtilities.ruleName = ruleName;
noImportantExceptUtilities.messages = messages;
const noImportantPlugin = (0, _stylelint.createPlugin)(ruleName, noImportantExceptUtilities);
var _default = exports.default = noImportantPlugin;