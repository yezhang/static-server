/**
 * Created by zhangye on 16/10/27.
 */
const send = require('koa-send');
// const path = require('path');

module.exports = function (hostConfig, router) {
    // const rootPath = path.resolve(__dirname, "../../", hostConfig.Path);
    const indexPagePath = hostConfig.Path + '/index.html';
    console.log(indexPagePath)

    router.get('/wx', function* (next) {
        console.log('收到了请求')
        yield send(this, indexPagePath)
    })
}