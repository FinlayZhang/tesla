const HappyPack = require('happypack');
const os = require('os');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
//开辟线程池
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports.plugins = [
  new HappyPack({
    id: 'file',
    threadPool: happyThreadPoll,
    loaders: [{
      loader: 'file-loader',
      options: {
        name: _mode == "production" ? "images/[name].[hash:5].[ext]" : "images/[name].[ext]"
      }
    }]
  }),
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPoll,
    loaders: [{
      loader: 'babel-loader',
      options: {
        presets: [["env", { "modules": false }], "stage-0"]
      }
    }]
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPoll,
    loaders: [{
      fallback: "style-loader",
      loader: 'css-loader',
      options: { 
        importLoaders: 1,
        minimize: _modeflag
      }},
      'postcss-loader',
      // 'less-loader'
    ]
  }),
];