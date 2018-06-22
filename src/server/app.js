import Koa from "koa";
import config from "./config";
import render from "koa-swig";
import serve from "koa-static";
import log4js from 'log4js';
import co from 'co';
import cors from '@koa/cors';
import errorHandler from "./middlewares/errorHandler";
const { createContainer, Lifetime } = require('awilix');
const { loadControllers,scopePerRequest } = require('awilix-koa');
const app = new Koa();
//创建IOC的容器
const container = createContainer();
//每一次的请求都是一个 new model
app.use(scopePerRequest(container));
//装载所有的models,并将services代码注入到controllers
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED
    }
});
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/tesla.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
//允许跨域
app.use(cors());
//注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));
app.use(serve(config.staticDir));
app.listen(config.port, () => {
    console.log(`teslaSystem listening on ${config.port}`);
});
module.exports = app;