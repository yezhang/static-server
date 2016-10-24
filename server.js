/**
 * 部署前端静态资源的服务器。
 * Created by zhangye on 16/9/23.
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

const app = koa();

log4js.configure('config/log4j.json', {reloadSecs: 300});

const log = log4js.getLogger('static-server')

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

const hostConfig = require('./config/hostConfig');

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
 * 处理没有路由的静态资源。
 */
app.use(staticServer(path.join(__dirname, hostConfig.Path)));

onerror(app);

// 监听当前服务器的全部 IP 地址，以便代码在不同服务器移植。
var IP = hostConfig.IP;
/**
 * 端口 8000，用于企业空间内嵌 App。
 * @type {number}
 */
var port = hostConfig.Port
app.listen(port, IP);

console.log(`静态服务器启动成功, 访问地址 http://${IP}:${port}`);
