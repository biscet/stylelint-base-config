"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stylelint = require("stylelint");
/* eslint-disable sonarjs/slow-regex, sonarjs/regex-complexity */

const ruleName = 'basic-rules/no-hardcoded-colors';
const messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: value => `Unexpected hard-coded color value "${value}". Use a CSS custom property (var(--…)) or SCSS variable instead.`
});
const hexColor = /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/iu;
const funcColor = /\b(?:rgb|hsl)a?\(\s*[^)]*\)/iu;
const keywordColor = /\b(?:aliceblue|antiquewhite|aqua|azure|beige|black|blue|brown|chartreuse|coral|crimson|currentcolor|cyan|darkblue|darkgreen|darkslategray|deeppink|firebrick|fuchsia|ghostwhite|gold|gray|green|hotpink|indigo|ivory|khaki|lavender|lawngreen|lemonchiffon|lightblue|lightgreen|linen|magenta|maroon|mediumblue|navy|olive|orange|orchid|peru|pink|plum|purple|red|royalblue|salmon|sienna|silver|skyblue|slategray|snow|springgreen|tan|teal|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow)\b/iu;
function containsHardcodedColor(value) {
  const tests = [hexColor, funcColor, keywordColor];
  for (const re of tests) {
    const m = value.match(re);
    if (m) return m[0];
  }
  return null;
}
const noHardcodedColorsRuleFn = (enabled = true) => {
  return (root, result) => {
    if (!_stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })) {
      return;
    }
    root.walkDecls(decl => {
      if (decl.prop.startsWith('$')) return;
      const val = decl.value;
      if (/var\(--.+\)/.test(val) || /\$[a-zA-Z0-9_-]+/.test(val)) return;
      const bad = containsHardcodedColor(val);
      if (bad) {
        _stylelint.utils.report({
          node: decl,
          result,
          ruleName,
          message: messages.rejected(bad),
          word: bad
        });
      }
    });
  };
};
noHardcodedColorsRuleFn.ruleName = ruleName;
noHardcodedColorsRuleFn.messages = messages;
const noHardcodedColorsPlugin = (0, _stylelint.createPlugin)(ruleName, noHardcodedColorsRuleFn);
var _default = exports.default = noHardcodedColorsPlugin;