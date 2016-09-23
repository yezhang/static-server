var send = require('koa-send');
var koa = require('koa');
var app = koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
var router = new Router({
    prefix: '/public'
});
app.use(cors())
    .use(router.routes ())
    .use(router.allowedMethods());
    router.get('/:fname/:cname', koaBody, function*(next) {
      var fname = this.params.fname;
      var cname = this.params.cname;
      console.log(fname);
      console.log(cname);
        yield send(this,"'./public/'+fname+'/'+cname+")
    })
    var port = 3001;
    app.listen(port);
    console.log(`Mock Server 启动, 正在监听端口: ${port}`);
    console.log(`不要关闭该进程，请访问该地址: http://localhost:${port}`);
