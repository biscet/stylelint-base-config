"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = require("stylelint");
const maxNestingRuleName = 'basic-rules/max-nesting-depth';
const maxNestingMessages = stylelint_1.utils.ruleMessages(maxNestingRuleName, {
    exceeded: (depth, max) => `Nesting depth ${depth} exceeds the maximum of ${max}`,
});
function getNestingDepth(node) {
    var _a;
    let depth = 0;
    for (let p = node.parent; p && p.type !== 'root'; p = p.parent) {
        if (p.type === 'rule' ||
            (p.type === 'atrule' && ((_a = p.parent) === null || _a === void 0 ? void 0 : _a.type) !== 'root')) {
            depth++;
        }
    }
    return depth;
}
const maxNestingRuleFn = (maxDepth) => {
    return (root, result) => {
        if (!stylelint_1.utils.validateOptions(result, maxNestingRuleName, {
            actual: maxDepth,
            possible: (v) => typeof v === 'number' && v >= 0,
        }))
            return;
        root.walkRules((ruleNode) => {
            const depth = getNestingDepth(ruleNode);
            if (depth > maxDepth) {
                stylelint_1.utils.report({
                    node: ruleNode,
                    result,
                    ruleName: maxNestingRuleName,
                    message: maxNestingMessages.exceeded(depth, maxDepth),
                    word: ruleNode.selector,
                });
            }
        });
    };
};
maxNestingRuleFn.ruleName = maxNestingRuleName;
maxNestingRuleFn.messages = maxNestingMessages;
const maxNestingDepthPlugin = (0, stylelint_1.createPlugin)(maxNestingRuleName, maxNestingRuleFn);
exports.default = maxNestingDepthPlugin;
