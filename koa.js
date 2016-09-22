// var http = require('http');
// var url = require("url");
// var path = require("path");
var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
var gzip = require('koa-gzip');
 var cacheControl = require('koa-cache-control');
var staticCache = require('koa-static-cache');
var router = new Router({
    prefix: '/public'
});
var files = {};
// app.use(staticCache('/public', {
//     maxAge: 60 * 60 * 24 * 365
// },files)
// files['/package.json'].maxAge = 60 * 60 * 24 * 30
app.use(gzip());
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

// var server = http.createServer(function(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     var realPath = "assets" + pathname;
//     console.log(realpath);
//     fs.readFile(realpath, "binary", function(err, file) {
//         if (err) {
//             res.writeHead(500, {
//                 'Content-type': 'text/plain'
//             })
//             res.end(err)
//         } else {
//             res.writeHead(304, {
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'image/png',
//                 'ETag': "666666",
//                 'Cache-Control': 'max-age=31536000, public',
//                 'Expires': 'Mon, 07 Sep 2026 09:32:27 GMT'
//             })
//             res.write(file, "binary")
//             res.end()
//         }
//     })
// })

router.get('/:fname/:cname', koaBody, function*() {
        var fname = this.params.fname;
        var cname = this.params.cname;
        console.log("文件类型" + fname);
        console.log("文件名" + cname);
        // res.header('Cache-Control', 'max-age=604800')
        yield send(this, "./public/" + fname + "/" + cname);
    })
    // app.use(function*(req, res, next) {
    //     res.cacheControl({
    //         maxAge: 500000
    //     });
    //     next();
    // });
app.use(function*(next) {
    this.cacheControl = {
        maxAge: 6000
    };

    try {
        yield next;
    } catch (err) {
        this.cacheControl = {
            maxAge: 500
        };
    }
});
var port = 8003;
app.listen(port);

console.log(` 启动成功,端口: ${port}`);
