"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stylelint = require("stylelint");
const ruleName = 'basic-rules/max-control-nesting';
const messages = _stylelint.utils.ruleMessages(ruleName, {
  exceeded: (depth, max) => `Control-directive nesting depth ${depth} exceeds the maximum of ${max}`
});
const CONTROL_NAMES = new Set(['if', 'for', 'each', 'while']);
function isControl(atRule) {
  return CONTROL_NAMES.has(atRule.name.toLowerCase());
}
function getControlDepth(atRule) {
  let depth = 0;
  for (let p = atRule.parent; p && p.type !== 'root'; p = p.parent) {
    if (p.type === 'atrule' && isControl(p)) depth++;
  }
  return depth;
}
const maxControlNestingFn = (maxDepth = 1) => {
  return (root, result) => {
    if (!_stylelint.utils.validateOptions(result, ruleName, {
      actual: maxDepth,
      possible: v => typeof v === 'number' && v >= 0
    })) return;
    root.walkAtRules(atRule => {
      if (!isControl(atRule)) return;
      const depth = getControlDepth(atRule);
      if (depth > maxDepth) {
        _stylelint.utils.report({
          node: atRule,
          result,
          ruleName,
          message: messages.exceeded(depth, maxDepth),
          word: `@${atRule.name}`
        });
      }
    });
  };
};
maxControlNestingFn.ruleName = ruleName;
maxControlNestingFn.messages = messages;
const maxControlNestingPlugin = (0, _stylelint.createPlugin)(ruleName, maxControlNestingFn);
var _default = exports.default = maxControlNestingPlugin;