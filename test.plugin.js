"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stylelint = require("stylelint");
const ruleName = 'basic-rules/no-extend';
const messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: '@extend is not allowed; use mixins or utilities instead.'
});
const noExtendRuleFn = (enabled = true) => {
  return (root, result) => {
    if (!_stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })) return;
    if (!enabled) return;
    root.walkAtRules('extend', atRule => {
      _stylelint.utils.report({
        node: atRule,
        result,
        ruleName,
        message: messages.rejected,
        word: '@extend'
      });
    });
  };
};
noExtendRuleFn.ruleName = ruleName;
noExtendRuleFn.messages = messages;
const noExtendPlugin = (0, _stylelint.createPlugin)(ruleName, noExtendRuleFn);
var _default = exports.default = noExtendPlugin;