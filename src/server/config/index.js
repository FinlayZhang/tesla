const _ = require('lodash');
const path = require('path');
let config = {
    "viewDir": path.join(__dirname,'..','views'),
    "staticDir":path.join(__dirname,'..','assets'),
    port: 8081,
    "env": process.env.NODE_ENV //"development" 、"production"  
};
//开发环境下
if (process.env.NODE_ENV == "development") {
    const localConfig = {
       port: 8085
    };
    config = _.extend(config, localConfig);
}
//上线环境下
if (process.env.NODE_ENV == "production") {
    const proConfig = {
        port: 8081
    };
    config = _.extend(config, proConfig);
}
export default config;

