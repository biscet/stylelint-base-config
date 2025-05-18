"use strict";
const config = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-idiomatic-order"
    ],
    plugins: [
        "stylelint-scss",
        "stylelint-high-performance-animation",
    ],
    customSyntax: "postcss-scss",
    rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "color-hex-length": "long",
        "selector-pseudo-class-no-unknown": [true, {
                ignorePseudoClasses: ["global", "local"]
            }],
        "plugin/no-low-performance-animation-properties": true,
        "plugin/no-hardcoded-colors": true
    }
};
module.exports = config;
