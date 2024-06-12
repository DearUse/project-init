"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const webpack_1 = __importDefault(require("webpack"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const webpackDev_config_1 = require("../config/webpackDev.config");
const webpack_config_1 = require("../config/webpack.config");
path_1.default.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
const envPath = path_1.default.resolve(__dirname, '../../../../.env');
const dotenvConfig = dotenv_1.default.config({
    path: envPath
});
console.log(dotenvConfig.parsed, '环境变量');
let newObj = {};
if (dotenvConfig.parsed) {
    Object.keys(dotenvConfig.parsed).forEach(d => {
        newObj[d] = dotenvConfig.parsed ? JSON.stringify(dotenvConfig.parsed[d]) : '';
    });
    console.log(newObj, 'newObj');
}
const buildConfig = (0, webpack_config_1.configFactory)('development', newObj);
const compiler = (0, webpack_1.default)(buildConfig);
const devServer = new webpack_dev_server_1.default(webpackDev_config_1.config, compiler);
// Launch WebpackDevServer.
devServer.startCallback(() => {
    //   if (isInteractive) {
    //     clearConsole();
    //   }
    //   if (env.raw.FAST_REFRESH && semver.lt(react.version, "16.10.0")) {
    //     console.log(
    //       chalk.yellow(
    //         `Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`
    //       )
    //     );
    //   }
    console.log(process.env.UMI_CLIENT_API_URL_LANGUAGE, 'dd');
    console.log("Starting the development server...");
    //   console.log(chalk.cyan("Starting the development server...\n"));
    //   openBrowser(urls.localUrlForBrowser);
});
