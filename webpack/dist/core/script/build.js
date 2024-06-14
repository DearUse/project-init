"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const chalk_1 = __importDefault(require("chalk"));
const webpack_config_1 = require("../config/webpack.config");
const buildConfig = (0, webpack_config_1.configFactory)('production');
const compiler = (0, webpack_1.default)(buildConfig);
compiler.run((err, stats) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('compiler success!', err);
    chalk_1.default.green(stats?.endTime);
});
