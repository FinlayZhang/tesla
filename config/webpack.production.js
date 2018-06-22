const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const minify = require('html-minifier').minify;
module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundle.js"
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
    ],
}
