var http = require('http');
var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'));
//http://localhost:8000/public/img/user.png
app.get('/publi/:fname/:cname', function(req, res) {
    var fname = req.params.fname;
    var cname = req.params.cname;
    console.log(fname);
    console.log(cname);
    res.sendfile("./public/"+fname+"/"+cname);
http.createServer(app).listen('8000', function() {
    console.log('启动服务器完成http://localhost:8000/public/');
});
