var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
var fs = require('fs');
var compression = require('compression');
var router = new Router({
    prefix: '/public'
});
app.use(compression());
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
router.get('/:fname/:cname', koaBody, function*() {
    var fname = this.params.fname;
    var cname = this.params.cname;
    console.log(fname);
    console.log(cname);
    console.log(this.body);
    yield send(this, "./public/" + fname + "/" + cname);
})
var port = 8000;
app.listen(port);
console.log(` 启动成功,端口: ${port}`);
