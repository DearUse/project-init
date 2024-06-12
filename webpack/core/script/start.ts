import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';
import { config } from '../config/webpackDev.config';
import { configFactory } from '../config/webpack.config';


path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

const envPath = path.resolve(__dirname, '../../../../.env')

const dotenvConfig = dotenv.config({
    path : envPath
})

console.log(dotenvConfig.parsed,'环境变量')

let newObj:{[name:string]: string} ={}
if(dotenvConfig.parsed){
    Object.keys(dotenvConfig.parsed).forEach(d=>{
        newObj[d] = dotenvConfig.parsed ? JSON.stringify(dotenvConfig.parsed[d]) :''
    })
    console.log(newObj,'newObj')
}


const buildConfig = configFactory('development', newObj)
const compiler = webpack(buildConfig);
const devServer = new WebpackDevServer(config, compiler);
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

    console.log(process.env.UMI_CLIENT_API_URL_LANGUAGE,'dd')

    console.log("Starting the development server...")

    //   console.log(chalk.cyan("Starting the development server...\n"));
    //   openBrowser(urls.localUrlForBrowser);
});