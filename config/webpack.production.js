const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const path = require("path");
const minify = require('html-minifier').minify;
module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundle.js",
        publicPath: '' //这里要放的是静态资源CDN的地址(只在生产环境下配置)
    },
    plugins: [
        new CopyWebpackPlugin(
            [{
                from: path.join(__dirname, "../" + "/src/webapp/views/common/layout.html"),
                to: "../views/common/layout.html"
            }]),
        new CopyWebpackPlugin(
            [{
                from: path.join(__dirname, "../" + "src/webapp/widgets/"),
                to: "../widgets",
                transform(content) {
                    return minify(content.toString('utf-8'), {
                        collapseWhitespace: true
                    });
                }
            }], {
                ignore: ['*.js', '*.css'],
            }),
        new ExtractTextPlugin({
            filename: "styles/[name][hash:5].css",
            allChunks: true
        }),
        // tree shaking
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
    ],
}
