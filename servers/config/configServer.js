/**
 * Created by zhangye on 16/10/24.
 */

'use strict';
// const fs = require('fs');
const path = require('path');
const bytes = require('bytes');
const koa = require('koa');

const onerror = require('koa-onerror');
// const logger = require('koa-logger')
const log4js = require('koa-log4')

const staticServer = require('koa-static');
var compress = require('koa-compress');
const send = require('koa-send');
const Router = require('koa-router');
const koaBody = require('koa-body')();

log4js.configure('config/log4j.json', {reloadSecs: 300});

const app = koa();

const log = log4js.getLogger('static-servers')

const router = new Router();
router.use(koaBody);

/**
 *
 * @param hostConfig
 * @param configRoutes (optional) function，配置路由
 * @returns {*}
 */
module.exports = function (hostConfig, configRoutes) {

    /**
     * 启用文件压缩
     */
    app.use(compress());

// app.use(logger());

    /**
     * 对所有请求做拦截
     */
    app.use(function * (next) {
        let href = this.href;
        // let origin = this.origin;
        // let ip = this.ip;
        let method = this.method;
        log.info(method + " -> " + href);

        yield next;

        let len = bytes(this.length);
        log.info(this.status + " <- " + href + " " + len);
    });

    app.use(router.routes())
        .use(router.allowedMethods());

    onerror(app);

    const indexPagePath = hostConfig.Path + '/index.html';

    /**
     * 将请求转发到单独页面。
     */
    router.get('/', function * (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 处理登录页面。
     */
    router.get('/login', function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 用户点击发票消息后，跳转路由。
     */
    router.get('/timeline', function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 登录首页。
     */
    router.get('/home', function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 登录企业空间的路由
     */
    router.get('/qykjCASLogin', function* (next) {
        yield send(this, indexPagePath)
    });

    if (typeof configRoutes === 'function') {
        log.info('配置自定义路由')
        configRoutes(hostConfig, router);
    }

    const rootPath = path.resolve(__dirname, "../../", hostConfig.Path);
    /**
     * 处理没有路由的静态资源。
     */
    app.use(staticServer(rootPath, {maxage: 86400000,index: 'notExists.html'}));

    return app;
};

module.exports.router = router;