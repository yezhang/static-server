/**
 * Created by zhangye on 16/10/27.
 */
const send = require('koa-send');
// const path = require('path');

module.exports = function (hostConfig, router) {
    // const rootPath = path.resolve(__dirname, "../../", hostConfig.Path);
    const indexPagePath = hostConfig.Path + '/index.html';
    console.log(indexPagePath)

    /**
     * 我的发票
     */
    router.get('/wechatInvoice', function* (next) {
        console.log('/wechatInvoice')
        yield send(this, indexPagePath)
    });

    /**
     * 报销列表
     */
    router.get('/wechatReimbursement', function* (next) {
        console.log('/wechatReimbursement')
        yield send(this, indexPagePath)
    });

    /**
     * 创建报销
     */
    router.get('/createReimbursement', function* (next) {
        console.log('/createReimbursement')
        yield send(this, indexPagePath)
    });

    /**
     * 发票名片
     */
    router.get('/card', function* (next) {
        console.log('/card')
        yield send(this, indexPagePath)
    });

}