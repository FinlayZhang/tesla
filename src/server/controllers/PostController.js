import bodyParser from 'koa-bodyparser';
import { route, POST, before } from 'awilix-koa';
@route("/post")
class PostController {
    constructor({postService}) {
        this.postService = postService;
    }
    // 路由 post
    @POST()
    @before([bodyParser()])
    async postData(ctx) {
        const data = ctx.request.body;
        const name = data.name;
        const pwd = data.pwd;
        ctx.body = `${name}-${pwd}`;
    }
}
export default PostController;