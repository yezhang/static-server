'use script'
var send = require('koa-send');
var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var cors = require('koa-cors');
var koaBody = require('koa-body')();
var router = new Router({
    prefix: '/public'
});
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

  router.get('/:fname/:cname', koaBody, function *() {
        var fname = this.params.fname;
        var cname = this.params.cname;
        console.log(fname);
        console.log(cname);
        // var arr= new Array;
        // arr[0]=fname;
        // arr[1]=cname;
          yield send(this,"./public/"+fname+"/"+cname);
      //  return arr;
    })
    // var fanme = arr[0];
    // var cname = arr[1];
    // console.log(fname);
    // console.log(cname);
    // app.use(function *(){
    //   yield send(this, "'./public/'+t.fname+'/'+t.cname");
    // })
    var port = 8000;
    app.listen(port);
    console.log(` 启动成功,端口: ${port}`);
