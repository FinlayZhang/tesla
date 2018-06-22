const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
module.exports = {
    plugins: [
        new CopyWebpackPlugin(
            [{
                from: path.join(__dirname, "../" + "/src/webapp/views/common/layout.html"),
                to: "../views/common/layout.html"
            }]),
        new CopyWebpackPlugin(
            [{
                from: path.join(__dirname, "../" + "src/webapp/widgets/"),
                to: "../widgets"
            }], {
                copyUnmodified: true,
                ignore: ['*.js', '*.css'],
            }),
        new ExtractTextPlugin({
            // filename: "styles/[name].css",
            filename: (getPath) => {
                // const _path = getPath('styles/[name].css');
                return getPath('styles/[name].css');
            },
            allChunks: true
        })
    ],
    watch: true, // 开启监听文件更改，自动刷新
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
};
