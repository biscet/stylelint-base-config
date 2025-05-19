"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const plugins_1 = __importDefault(require("./rules/plugins"));
exports.config = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-idiomatic-order'
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-high-performance-animation',
        ...plugins_1.default
    ],
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
        'basic-rules/max-nesting-depth': 3,
        'basic-rules/no-hardcoded-colors': true,
        'basic-rules/no-literal-z-index': true,
        'basic-rules/no-extend': true,
        'basic-rules/max-control-nesting': 1,
    }
};
