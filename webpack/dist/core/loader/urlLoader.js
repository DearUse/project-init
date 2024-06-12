"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader = () => {
    return {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
            loader: require.resolve('url-loader'),
            options: {
                name: 'static/images/[name]_[hash:6].[ext]',
                // 小于 150kb 的图片进行 base64 编码，大于等于 150kb 的图片则进行单独的打包
                limit: 150 * 1024
            }
        }
    };
};
exports.default = loader;
