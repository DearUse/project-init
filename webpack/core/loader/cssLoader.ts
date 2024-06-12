import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Params {
    isDev: boolean;
}





// isDev = true 它使用多个 <style></style> 将 CSS 注入 DOM 并且运行速度更快
// isDev = false 拆分样式到css文件，但是只在生产环境使用
const styleLoader = (isDev: boolean) => {
    console.log(isDev,'cssLoader')
    if (isDev) {
        //把css-loader解析后的样式内联插入到HTML的head中，style的方式
        return {
            loader: require.resolve("style-loader"),
        }
    }
    // 这里因为要把css 单独从html的style里单独成文件用link文件的方式，和style-loader不能共用
    return {
        loader: MiniCssExtractPlugin.loader,
        options: {
            // publicPath: "../css/",
            // publicPath: (resourcePath: string, context: string) => {
            //     console.log(resourcePath,'resourcePath')
            //     console.log(context,'context')
            //     console.log(path.relative(path.dirname(resourcePath), context) + "/",'endPath')
            //     return path.relative(path.dirname(resourcePath), context) + "/";
            // },
        }
    }
}

const loader = (params: Params) => {
    return [
        {
            test: /\.css$/,
            use: [
                styleLoader(params.isDev),
                {
                    loader: require.resolve("css-loader"),
                    options: {
                        importLoaders: 1,
                        sourceMap: params.isDev,
                        modules: true
                    }
                },
                {
                    loader: require.resolve("postcss-loader")
                }
            ]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                styleLoader(params.isDev),
                {
                    //处理CSS的模块化（如import）和使用url引入的外部资源。
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 2,
                        sourceMap: params.isDev,
                        // 支持 import Style form './a.ccss'
                        modules: true
                    }
                },
                {
                    loader: require.resolve("postcss-loader")
                },
                {
                    loader: require.resolve('sass-loader')
                },
            ]
        },
        {
            test: /\.less$/i,
            use: [
                styleLoader(params.isDev),
                {
                    //处理CSS的模块化（如import）和使用url引入的外部资源。
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 2,
                        sourceMap: !params.isDev,
                        modules: true

                    }
                },
                {
                    loader: require.resolve('less-loader')
                },
            ]
        }
    ]
}

export default loader