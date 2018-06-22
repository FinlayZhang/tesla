import { route, GET } from 'awilix-koa';
@route("/users")
class UserController {
    constructor({userService}) {
        this.userService = userService;
    }
    //路由 users
    @GET()
    async getIndex(ctx) {
        ctx.body = await ctx.render('users/pages/index', { data: "我是直出的变量" });
    }
    //路由 users/123
    @route("/:id")
    @GET()
    async getUser(ctx) {
        const result = await this.userService.getData(ctx.params.id);
        ctx.body = { data: result };
    }
}
export default UserController;
