"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = require("stylelint");
const ruleName = 'basic-rules/max-control-nesting';
const messages = stylelint_1.utils.ruleMessages(ruleName, {
    exceeded: (depth, max) => `Control-directive nesting depth ${depth} exceeds the maximum of ${max}`,
});
const CONTROL_NAMES = new Set(['if', 'for', 'each', 'while']);
function isControl(atRule) {
    return CONTROL_NAMES.has(atRule.name.toLowerCase());
}
function getControlDepth(atRule) {
    let depth = 0;
    for (let p = atRule.parent; p && p.type !== 'root'; p = p.parent) {
        if (p.type === 'atrule' && isControl(p))
            depth++;
    }
    return depth;
}
const maxControlNestingFn = (maxDepth = 1) => {
    return (root, result) => {
        if (!stylelint_1.utils.validateOptions(result, ruleName, {
            actual: maxDepth,
            possible: (v) => typeof v === 'number' && v >= 0,
        }))
            return;
        root.walkAtRules((atRule) => {
            if (!isControl(atRule))
                return;
            const depth = getControlDepth(atRule);
            if (depth > maxDepth) {
                stylelint_1.utils.report({
                    node: atRule,
                    result,
                    ruleName,
                    message: messages.exceeded(depth, maxDepth),
                    word: `@${atRule.name}`,
                });
            }
        });
    };
};
maxControlNestingFn.ruleName = ruleName;
maxControlNestingFn.messages = messages;
const maxControlNestingPlugin = (0, stylelint_1.createPlugin)(ruleName, maxControlNestingFn);
exports.default = maxControlNestingPlugin;
