"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chunk = () => {
    return {
        minSize: 30, //提取出的chunk的最小大小
        cacheGroups: {
            default: {
                name: 'common',
                chunks: 'initial',
                minChunks: 2, //模块被引用2次以上的才抽离
                priority: -20
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'initial',
                priority: -10
            },
            locallib: {
                test: /(src\/locallib\.js)$/,
                name: 'locallib',
                chunks: 'initial',
                priority: -9
            }
        }
    };
};
exports.default = chunk;
