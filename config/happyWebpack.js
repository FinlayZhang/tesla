const HappyPack = require('happypack');
const os = require('os');
//开辟一个线程池
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports.plugins = [
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPoll,
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: [["env", { "modules": false }]]
      }
    }]
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPoll,
    loaders: [{ 
      loader: 'css-loader', 
      options: { importLoaders: 1 } 
    },'postcss-loader']
  })
];