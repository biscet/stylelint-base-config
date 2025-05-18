import type { Config } from 'stylelint';
import plugins from './rules/plugins';

const config: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-high-performance-animation',
    ...plugins
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'color-hex-length': 'long',
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global', 'local']
    }],
    'plugin/no-low-performance-animation-properties': true,
    'basic-rules/max-nesting-depth': 4,
  }
};

export = config;
