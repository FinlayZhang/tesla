/**
 * @fileOverview 实现Index 数据模型
 * @author 1009284544@qq.com
 */

/**
 * UserService类，生成一段异步的数据
 * @class
 */
export default class UserService{
    /**
     * @constructor
     * @param {string} app koa2的上下文环境
     */
    constructor(){}
    /**
     * 获取具体的API接口数据
     * @returns {Promise} 返回的异步处理结果
     * @example
     * return new Promise
     * getData()
     */
    getData(id){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(`Hello UserAction【${id}】`);
            },1000);
            //throw new Error("")
            //reject("")
        });
    }
}