var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
// var fs = require('fs');
var gzip = require('koa-gzip')
    // var zlib = require('zlib');
    // var gunzipStream = zlib.createGunzip();
    // var toWrite = fs.createWriteStream('new.js');
var router = new Router({
    prefix: '/public'
});
// var options = {
//     hostname: "localhost"
//     port: "8001"
//     headers: {
//         'accept-Encoding': 'gzip'
//     }
// }
// http.request(options, handler);
// function handler(responder) {
//     if (responder.headers['content-encoding'].indexOf('gzip') != -1) {
//         // 解压gzip
//         responder.pipe(gunzipStream).pipe(toWrite);
//     }
// }
app.use(gzip());
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/:fname/:cname', koaBody, function*() {
    var fname = this.params.fname;
    var cname = this.params.cname;
    console.log("文件类型" + fname);
    console.log("文件名" + cname);

    yield send(this, "./public/" + fname + "/" + cname);
})
app.use(gzip());
var port = 8001;
app.listen(port);
console.log(` 启动成功,端口: ${port}`);
