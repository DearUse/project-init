


 const loader = () => {
    return {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            // 转码功能依赖 Babel 的核心转码包
            loader: require.resolve('babel-loader'),
            options: {
                plugins: [
                    // // 支持class装饰器和class内函数装饰器
                    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
                    // //提供匿名空间 export * as ns from 'mod' 语法
                    [require.resolve('@babel/plugin-proposal-export-namespace-from')],
                ],
                presets: [
                    [
                        //是一个智能预设，允许你使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换 以及可选的浏览器 polyfill
                        // 会根据你的环境配置，把 ES6+ 代码翻译成环境能支持的 ES5
                        require.resolve('@babel/preset-env'),
                        {
                            targets: {
                                chrome: '51',
                                ie: '9',
                            }, // 根据项目去配置
                            useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                            corejs: 3, // 使用 core-js@3 版本
                        },
                    ],
                    //来编译 ts 代码
                    [require.resolve('@babel/preset-typescript')],
                    // 转译React
                    [require.resolve('@babel/preset-react')],
                ],
            },
        }
    }
}

export default loader