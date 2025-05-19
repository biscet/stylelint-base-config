"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stylelint = require("stylelint");
/* eslint-disable sonarjs/prefer-single-boolean-return */

const ruleName = 'basic-rules/no-literal-z-index';
const messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: value => `Unexpected literal z-index value "${value}". Use a CSS custom property (var(--…)) or a Sass variable instead.`
});
const literalInt = /^-?\d[\d_]*$/u;
function isAllowed(value) {
  if (/var\(--.+\)/.test(value)) return true;
  if (/^\$[\w-]+$/.test(value)) return true;
  if (value.trim() === 'auto') return true;
  if (/^calc\(.+\)$/u.test(value)) return true;
  return false;
}
const noLiteralZRuleFn = (enabled = true) => {
  return (root, result) => {
    if (!_stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })) return;
    root.walkDecls('z-index', decl => {
      const value = decl.value.trim();
      if (!enabled) return;
      if (isAllowed(value)) return;
      if (literalInt.test(value)) {
        _stylelint.utils.report({
          node: decl,
          result,
          ruleName,
          message: messages.rejected(value),
          word: value
        });
      }
    });
  };
};
noLiteralZRuleFn.ruleName = ruleName;
noLiteralZRuleFn.messages = messages;
const noLiteralZPlugin = (0, _stylelint.createPlugin)(ruleName, noLiteralZRuleFn);
var _default = exports.default = noLiteralZPlugin;