 import { route, GET } from 'awilix-koa';
@route('/')
@route('/index.html')
class helloAPI {
    constructor({testService}){
        this.testService = testService;
    }
    @GET()
    async getData(ctx) {
        const result = this.testService.find();
        ctx.body = await ctx.render('index/pages/index', { data: result });
    }
}
export default helloAPI;