import { Compiler, MultiCompiler, Configuration } from 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import jsLoader from '../loader/jsLoader';
import cssLoader from '../loader/cssLoader';
import urlLoader from '../loader/urlLoader';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BundleAnalyzer from 'webpack-bundle-analyzer'
import WebpackBar from 'webpackbar'
import chalk from 'chalk'
import { runLoaderByEnv } from '../utils';

const rootPath = path.resolve(__dirname, '../../../../src')

export const configFactory = (env: string, customer_process_env?: {[name: string]: string} | undefined): webpack.Configuration => {

    const isDev = env !== 'production'

    console.log(path.join(rootPath, 'index.tsx'), '入口文件')
    console.log(path.join(rootPath, '../dist'), '输出目录')
    return {
        mode: isDev ? 'development' : 'production',
        entry: path.join(rootPath, 'index.tsx'),
        output: {
            clean: true,
            path: path.join(rootPath, '../dist'), // 打包后的代码放在dist目录下
            // 开发模式不生产hash
            filename: isDev ? '[name].bundle.js' : '[name].[chunkhash:8].bundle.js',
        },
        target: ['browserslist'],
        // Webpack noise constrained to errors and warnings
        stats: 'errors-warnings',
        // 开发环境source-map  方便调试
        devtool: isDev ? 'eval' : false,
        resolve: {
            // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
            extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
        },
        cache: {
            // 构建缓存到本地文件
            type: 'filesystem'
        },
        module: {
            rules: [
                urlLoader(),
                jsLoader(),
                ...cssLoader({
                    isDev
                })
            ]
        },
        plugins: [
            // 加载html
            new HtmlWebpackPlugin({
                template: path.join(rootPath, '../index.html'),
                filename: 'index.html'
            }),
            ...runLoaderByEnv([
                // 拆分样式到css文件，但是只在生产环境使用，因为本地用style-loader 它使用多个 <style></style> 将 CSS 注入 DOM 并且运行速度更快
                new MiniCssExtractPlugin({
                    filename: './style/[name].[hash:8].css',
                    chunkFilename: './style/[name].[hash:8].chunk.css',
                }),
                // 打包产物分析
                new BundleAnalyzer.BundleAnalyzerPlugin({
                    generateStatsFile: true,
                    openAnalyzer: false
                }),
            ], env, ['production']),
            ...runLoaderByEnv([
                // 开发模式 热更新 react 组件。
                new ReactRefreshWebpackPlugin(),
            ], env, ['development']),

            // Dll插件 静态

            // 图片压缩

            // 代码压缩

            //haahpack

            // 环境变量设置
            new webpack.DefinePlugin({
                a:'12',
                ...customer_process_env,
            }),
            // 进度条
            new WebpackBar({
                color: "#85d",
            })
        ],
        optimization: {
            splitChunks: {
                // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
                chunks: "all",
                // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
                // minSize: 30000,
                cacheGroups: {
                    // default: {
                    //     name: 'common',
                    //     chunks: 'initial',
                    //     minChunks: 2,  //模块被引用2次以上的才抽离
                    //     priority: -20
                    // },
                    // vendors: {  //拆分第三方库（通过npm|yarn安装的库）
                    //     test: /[\\/]node_modules[\\/]/,
                    //     name: 'vendor',
                    //     chunks: 'initial',
                    //     priority: -10
                    // },
                    // locallib: {  //拆分指定文件
                    //     test: /(src\/locallib\.js)$/,
                    //     name: 'locallib',
                    //     chunks: 'initial',
                    //     priority: -9
                    // },
                    styles: {
                        minSize: 3000,
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        // enforce: true,
                    },
                    // styles: {
                    //     name: 'styles',
                    //     test: /\.css$/i,
                    //     chunks: 'all',
                    //     enforce: true,
                    // },
                }
            }
        }
    }
}