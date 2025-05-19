import {
  utils,
  createPlugin,
  PostcssResult,
  Rule,
  Plugin,
} from 'stylelint';
import type { Root, AtRule, Container, Document, ChildNode } from 'postcss';

const ruleName = 'basic-rules/max-control-nesting';
const messages = utils.ruleMessages(ruleName, {
  exceeded: (depth: number, max: number) =>
    `Control-directive nesting depth ${depth} exceeds the maximum of ${max}`,
});

const CONTROL_NAMES = new Set(['if', 'for', 'each', 'while']);

function isControl(atRule: AtRule): boolean {
  return CONTROL_NAMES.has(atRule.name.toLowerCase());
}

function getControlDepth(atRule: AtRule): number {
  let depth = 0;

  for (let p: Container<ChildNode> | Document | undefined = atRule.parent; p && p.type !== 'root'; p = p.parent) {
    if (p.type === 'atrule' && isControl(p as AtRule)) depth++;
  }

  return depth;
}

const maxControlNestingFn: Rule<number, unknown> = (maxDepth = 1) => {
  return (root: Root, result: PostcssResult) => {
    if (
      !utils.validateOptions(result, ruleName, {
        actual: maxDepth,
        possible: (v) => typeof v === 'number' && v >= 0,
      })
    )
      return;

    root.walkAtRules((atRule) => {
      if (!isControl(atRule)) return;

      const depth = getControlDepth(atRule);
      if (depth > maxDepth) {
        utils.report({
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

const maxControlNestingPlugin: Plugin = createPlugin(
  ruleName,
  maxControlNestingFn,
);

export default maxControlNestingPlugin;
