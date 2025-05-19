"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customPlugins = void 0;
const max_nesting_depth_1 = __importDefault(require("./max-nesting-depth/max-nesting-depth"));
exports.customPlugins = [max_nesting_depth_1.default];
