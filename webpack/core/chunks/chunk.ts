

const chunk = () => {
    return {
        minSize: 30,  //提取出的chunk的最小大小
        cacheGroups: {
            default: {
                name: 'common',
                chunks: 'initial',
                minChunks: 2,  //模块被引用2次以上的才抽离
                priority: -20
            },
            vendors: {  //拆分第三方库（通过npm|yarn安装的库）
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'initial',
                priority: -10
            },
            locallib: {  //拆分指定文件
                test: /(src\/locallib\.js)$/,
                name: 'locallib',
                chunks: 'initial',
                priority: -9
            }
        }
    }

}
export default chunk