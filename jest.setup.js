import { getTestRule, getTestRuleConfigs } from "jest-preset-stylelint";
import plugins from './src.js';

global.testRule = getTestRule({ plugins });
global.testRuleConfigs = getTestRuleConfigs({ plugins });