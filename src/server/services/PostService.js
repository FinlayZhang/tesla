import safeRequest from '../libs/safeRequest';
/**
 * @fileOverview 实现Index 数据模型
 * @author 1009284544@qq.com
 */

/**
 * PostService类，实现POST接口
 * @class
 */
class PostService{
    /**
     * @constructor
     * @param {string} app koa2的上下文环境
     */
    constructor(ctx) {
        this.ctx = ctx;
    }
        /**
     * 获取具体的API接口数据
     * @example
     * return new Promise
     * postRequest()
     */
    postRequest(data){
        const safeRequestIns = new safeRequest(this.ctx,'http://localhost/index.php',data);
        return safeRequestIns.request();
    }
}
export default PostService;