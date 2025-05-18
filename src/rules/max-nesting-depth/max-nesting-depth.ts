import {
  utils, createPlugin, PostcssResult,
  Rule, Plugin,
} from 'stylelint';
import type { Root, Node as PostcssNode } from 'postcss';


const maxNestingRuleName = 'basic-rules/max-nesting-depth';
const maxNestingMessages = utils.ruleMessages(maxNestingRuleName, {
  exceeded: (depth: number, max: number) =>
    `Nesting depth ${depth} exceeds the maximum of ${max}`,
});

function getNestingDepth(node: PostcssNode): number {
  let depth = 0;

  for (let p = node.parent; p && p.type !== 'root'; p = p.parent) {
    if (
      p.type === 'rule' ||
      (p.type === 'atrule' && p.parent?.type !== 'root')
    ) {
      depth++;
    }
  }

  return depth;
}

const maxNestingRuleFn: Rule<number, unknown> = (
  maxDepth: number,
) => {
  return (root: Root, result: PostcssResult) => {
    if (
      !utils.validateOptions(result, maxNestingRuleName, {
        actual: maxDepth,
        possible: (v) => typeof v === 'number' && v >= 0,
      })
    ) return;

    root.walkRules((ruleNode) => {
      const depth = getNestingDepth(ruleNode);
      if (depth > maxDepth) {
        utils.report({
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


const maxNestingDepthPlugin: Plugin = createPlugin(
  maxNestingRuleName,
  maxNestingRuleFn
);

export default maxNestingDepthPlugin;
