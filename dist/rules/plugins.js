"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const max_nesting_depth_1 = __importDefault(require("./max-nesting-depth/max-nesting-depth"));
const no_hardcoded_colors_1 = __importDefault(require("./no-hardcoded-colors/no-hardcoded-colors"));
const no_literal_z_index_1 = __importDefault(require("./no-literal-z-index/no-literal-z-index"));
const no_extend_1 = __importDefault(require("./no-extend/no-extend"));
const max_control_nesting_1 = __importDefault(require("./max-control-nesting/max-control-nesting"));
exports.default = [
    max_nesting_depth_1.default, no_hardcoded_colors_1.default,
    no_literal_z_index_1.default, no_extend_1.default, max_control_nesting_1.default
];
