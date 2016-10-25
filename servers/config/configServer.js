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

var router = new Router();

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

module.exports = function (hostConfig) {
    const rootPath = path.resolve(__dirname, "../../", hostConfig.Path);

    const indexPagePath = hostConfig.Path + '/index.html';

    /**
     * 将请求转发到单独页面。
     */
    router.get('/', koaBody, function * (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 处理登录页面。
     */
    router.get('/login', koaBody, function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 用户点击发票消息后，跳转路由。
     */
    router.get('/timeline', koaBody, function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 登录企业空间的路由
     */
    router.get('/qykjCASLogin', koaBody, function* (next) {
        yield send(this, indexPagePath)
    });

    /**
     * 处理没有路由的静态资源。
     */
    app.use(staticServer(rootPath));

    return app;
};