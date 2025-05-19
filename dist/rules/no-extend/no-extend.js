"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = require("stylelint");
const ruleName = 'basic-rules/no-extend';
const messages = stylelint_1.utils.ruleMessages(ruleName, {
    rejected: '@extend is not allowed; use mixins or utilities instead.',
});
const noExtendRuleFn = (enabled = true) => {
    return (root, result) => {
        if (!stylelint_1.utils.validateOptions(result, ruleName, {
            actual: enabled,
            possible: [true, false],
        }))
            return;
        if (!enabled)
            return;
        root.walkAtRules('extend', (atRule) => {
            stylelint_1.utils.report({
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
const noExtendPlugin = (0, stylelint_1.createPlugin)(ruleName, noExtendRuleFn);
exports.default = noExtendPlugin;
