var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
var compress = require('koa-compress')
var fs = require('fs');
var router = new Router({
    prefix: '/public'
});
app.use(compress({
  filter: function (jpg) {
    return ("./public/img/out.jpg")(jpg)
  },
  threshold: 512,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
  router.get('/:fname/:cname', koaBody, function *() {
        var fname = this.params.fname;
        var cname = this.params.cname;
        console.log(fname);
        console.log(cname);
          this.compress = true
          this.body = fs.createReadStream("./public/"+fname+"/"+cname);
          console.log(this.body);
         yield send(this,"./public/"+fname+"/"+cname);
    })
    var port = 8000;
    app.listen(port);
    console.log(` 启动成功,端口: ${port}`);
