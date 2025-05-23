import type { Config } from 'stylelint';
import customPlugins from './rules/plugins';

export const config: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-high-performance-animation',
    ...customPlugins
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
    'basic-rules/no-important-except-utilities': true,
  }
};