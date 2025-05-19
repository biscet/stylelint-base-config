"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const plugins_1 = require("./rules/plugins");
exports.config = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-idiomatic-order'
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-high-performance-animation',
        ...plugins_1.customPlugins
    ],
    customSyntax: 'postcss-scss',
    rules: {
        'color-hex-length': 'long',
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'selector-pseudo-class-no-unknown': [true, {
                ignorePseudoClasses: ['global']
            }],
        'unit-no-unknown': null,
        'plugin/no-low-performance-animation-properties': [true, { ignoreProperties: ['color', 'background-color', 'border-radius', 'border-color'] }],
        'selector-type-no-unknown': [true, { ignore: ['custom-elements', 'default-namespace'] }],
        'selector-type-case': ['lower', { ignoreTypes: ['/.+/'] }],
        'property-no-unknown': null,
        'basic-rules/max-nesting-depth': 4,
    }
};
