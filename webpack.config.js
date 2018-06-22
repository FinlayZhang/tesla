const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve, join } = require("path");
const webpack = require('webpack');
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin.js');
const files = glob.sync("./src/webapp/views/**/*.entry.js");
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// const conf = require('./config/happyWebpack');
let _entry = {};
let _plugins = [];
for (let item of files) {
    // item.replace(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g, ($1) => {
    //     _entry[$1] = item;
    // });
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entrykey = RegExp.$1
        _entry[entrykey] = item;
        const [dist, template] = entrykey.split("-");
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            chunks: ["runtime", "common", entrykey],
            minify: {
                // removeComments: true,
                collapseWhitespace: _modeflag,
                removeAttributeQuotes: _modeflag
            },
            inject: false
        }));
    }
}
// 公共库 JQuery,lodash
_entry.vendor = ["jquery","lodash"];
let webpackConfig = {
    entry: _entry,
    module: {
        //编译太长记得把happyWebpack引入进来 Webpack5将取代这个插件
        /*{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'happypack/loader?id=babel',
        }, */
        // 各种loader
        rules: [{
            test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: _mode == "production" ? "images/[name].[hash:5].[ext]" : "images/[name].[ext]"
                }
            }]
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: _modeflag
                        }
                    },
                    'postcss-loader'
                ]
            })
        },{
            test:/\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: _modeflag
                        }
                    },
                    'postcss-loader', 'less-loader'
                ]
            })
        },{
            test: /\.jsx?$/,
            use: {
                loader: 'babel-loader',
                query: { //同时可以把babel配置写到根目录下的.babelrc中
                  presets: ['env', 'stage-0'] // env转换es6 stage-0转es7
                }
            }
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                "eslint-loader",
            ]
        }]
    },
    optimization: {
        //webpack4.x的最新优化配置项，用于提取公共代码
        //原CommonsChunkPlugin配置
        splitChunks: {
            cacheGroups: {
                common: {
                    //test: resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
                    chunks: 'all',
                    name: 'common',
                     minChunks: 2
                },
                // common-async: {
                //     chunks: "async",
                //     name: "common",
                //     minChunks: 2
                // }
            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
        new htmlAfterWebpackPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery' //所有页面都会引入$这个变量,不用再import引入
        }),
    ],
    resolve: {
        modules: [
            resolve(__dirname, 'node_modules'), // 使用绝对路径指定 node_modules，不做过多查询
        ],
        // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
        extensions: [".js", ".css"]
    }
};
module.exports = merge(webpackConfig, _mergeConfig);
