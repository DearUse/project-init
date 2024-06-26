"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontsLoader = exports.mediaLoader = exports.jpgLoader = void 0;
const jpgLoader = () => {
    return {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    name: '[name]_[hash:6].[ext]',
                    // 小于 50kb 的图片进行 base64 编码，大于等于 150kb 的图片则进行单独的打包
                    limit: 50 * 1024,
                    outputPath: 'static/images/',
                    publicPath: '/static/images/'
                }
            },
            {
                // 压缩图片
                loader: require.resolve('image-webpack-loader'),
                options: {
                    bypassOnDebug: true, // webpack@1.x
                    disable: false, // webpack@2.x and newer
                },
            },
        ]
    };
};
exports.jpgLoader = jpgLoader;
const mediaLoader = () => {
    return {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/media/[name]_[hash:6].[ext]',
        },
    };
};
exports.mediaLoader = mediaLoader;
const fontsLoader = () => {
    return {
        // Match woff2 in addition to patterns like .woff?v=1.1.1.
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: {
            loader: "url-loader",
            options: {
                // 小于 200kb 的字体进行 base64 编码，大于等于 150kb 的图片则进行单独的打包
                limit: 200 * 1024,
                // url-loader sets mimetype if it's passed.
                // Without this it derives it from the file extension
                mimetype: "application/font-woff",
                // Output below fonts directory
                name: "static/fonts/[name]_[hash:6].[ext]",
            }
        },
    };
};
exports.fontsLoader = fontsLoader;
