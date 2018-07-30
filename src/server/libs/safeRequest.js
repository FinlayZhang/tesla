/*
 *@Date 2018-07-06
 *@Author 1009284544@qq.com
 */
import rp from 'request-promise';
const headers = {
    'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};
export default class SafeRequest {
    constructor(ctx,url,data) {
        this.ctx = ctx;
        this.url = url;
        this.data = data;
    }
    request() {
        const options = {
            method: 'POST',
            uri: this.url,
            formData: {
                params: JSON.stringify(this.data)
            },
            json: true,
            headers: headers
        };
        const promise = new Promise((resolve, reject) => {
            (async() => {
                await rp(options).then((result)=>{
                    resolve({error_code: 0, result: result}); 
                }).catch((error)=>{
                    reject({error_code: 1, result: error});
                });
            })();
        });
        return promise;
    }
};