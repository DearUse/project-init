"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontsLoader = exports.jpgLoader = void 0;
const jpgLoader = (isDev) => {
    return [{
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        name: 'static/images/[name]_[hash:6].[ext]',
                        // 小于 150kb 的图片进行 base64 编码，大于等于 150kb 的图片则进行单独的打包
                        limit: 150 * 1024
                    }
                },
                {
                    loader: require.resolve('image-webpack-loader'),
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: isDev, // webpack@2.x and newer
                    },
                },
            ]
        }
    ];
};
exports.jpgLoader = jpgLoader;
const fontsLoader = () => {
    return {
        // Match woff2 in addition to patterns like .woff?v=1.1.1.
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
                // 小于 200kb 的图片进行 base64 编码，大于等于 150kb 的图片则进行单独的打包
                limit: 200 * 1024,
                // url-loader sets mimetype if it's passed.
                // Without this it derives it from the file extension
                mimetype: "application/font-woff",
                // Output below fonts directory
                name: "./fonts/[name].[ext]",
            }
        },
    };
};
exports.fontsLoader = fontsLoader;
