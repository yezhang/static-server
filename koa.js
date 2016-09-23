var send = require('koa-send');
var Koa = require('koa');
var serve = require('koa-static');
var app = new Koa();
var Router = require('koa-router');
var gzip = require('koa-gzip');
 var cacheControl = require('koa-cache-control');
 var chokidar = require('chokidar');
var router = new Router({
    prefix: '/public'
});
// app.use(cors())
//     .use(router.routes())
//     .use(router.allowedMethods());
    // router.get('/:fname/:cname', koaBody, function*(next) {
    //         var fname = this.params.fname;
    //         var cname = this.params.cname;
    //         console.log("文件类型" + fname);
    //         console.log("文件名" + cname);
    //       yield send(this, "./public/" + fname + "/" + cname);
    //         yield next;
    //     })
    app.use(cacheControl({
    maxAge: 500
}));
    app.use(function *(next){

        this.cacheControl = {
            maxAge: 60000
        };

        try {
            yield next;
        } catch (err) {
            this.cacheControl = {
                maxAge: 50
            };
        }
    });
app.use(function*(next){
  this.set('ETag', '123');
  // cache is ok
  if (this.fresh) {
    this.status = 304;
  }
yield next;
})
app.use(gzip());
app.use(serve(__dirname + '/public'));

var port = 8003;
app.listen(port);
console.log(` 启动成功,端口: ${port}`);
var watcher = chokidar.watch("public", {
    persistent: true // 保持监听状态
});
// 监听增加，修改，删除文件的事件
watcher.on('all', (event, path) => {
    switch (event) {
    case 'add':
        console.log('添加文件'+path)
    case 'change':
        console.log('改变文件'+path)
        break;
    case 'unlink':
        console.log('删除文件'+path);
        break;
    default:
        break;
    }
});
