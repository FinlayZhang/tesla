# tesla

## 配一张牛逼的图

![tesla!!!](https://o4j9g80u3.qnssl.com/public/assets/images/tesla.png)

## 介绍

tesla使用koa2+react+webpack4+gulp,以及npm集成管理工具,登录 [DIY(http://diy.liuxue.com)](http://diy.liuxue.com) ,体验功能.

## 注意

代码要写注释！！！

## 目录结构

```
tesla/
├── config  //  webpack插件，开发，生产配置文件
├── dist   //  编译生成打包文件
├── docs   //   jsdocs文档
├── logs    //  日志
├── src/
│   ├── server/
│   ├── webapp/
├── tests/   //  测试
```

### 本地运行说明

```
node版本>v7
npm install
npm run webpack
npm run gulp
npm run start
```

### 部署运行说明

* 正式环境部署:使用npm

```

```


## 测试部署

## 测试

### server目录说明

```
server使用AOP思想(DI)
config为node配置文件，包括dev和prod
controllers路由模块
middlewares自定义中间件(错误处理)
services(服务，可以理解为modal层)
app.js核心文件，server的入口，不要写逻辑
pm2.json热启动工具
```