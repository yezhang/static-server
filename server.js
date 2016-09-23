/**
 * 部署前端静态资源的服务器。
 * Created by zhangye on 16/9/23.
 */

// const fs = require('fs');
const path = require('path');
const koa = require('koa');
const onerror = require('koa-onerror');
const logger = require('koa-logger')
const staticServer = require('koa-static');
const gzip = require('koa-gzip');
const send = require('koa-send');
const Router = require('koa-router');
const koaBody = require('koa-body')();

const app = koa();

var router = new Router();

app.use(gzip());
app.use(logger());
app.use(router.routes())
    .use(router.allowedMethods());

router.get('/', koaBody, function *(next) {
  yield send(this, "/dist/index.html")
});

router.get('/login', koaBody, function* (next) {
    yield send(this, "/dist/index.html")
});

app.use(staticServer(path.join(__dirname,'dist')));

onerror(app);

var port = 9000;
app.listen(port);

console.log(`静态服务器启动成功, 访问地址 http://localhost:${port}`);
