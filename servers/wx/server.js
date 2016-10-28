/**
 * 部署前端静态资源的服务器。
 * Created by zhangye on 16/9/23.
 */
'use strict';

const config = require('../config/configServer');
const configWx = require('./configWxServer');

// const proxy = require('./proxy');
const proxy = require('koa-proxy');

const hostConfig = {
    IP: '0.0.0.0',
    Port: 1521, // 临时端口，借用 Oracle 的端口，上线时需要调整为真实接口
    Path: 'wx_dist'
}

const app = config(hostConfig, configWx);

app.use(function* (next) {
    console.log('转发请求中...')
    this.status = 302;
    this.body = '自动登录...'

    this.redirect('http://localhost' + this.path + '?' + this.querystring);
    // this.body = yield proxy('http://localhost:8080' + this.path + '?' + this.querystring);
    yield next;
});

// 监听当前服务器的全部 IP 地址，以便代码在不同服务器移植。
var IP = hostConfig.IP;
/**
 * 端口 8000，用于企业空间内嵌 App。
 * @type {number}
 */
var port = hostConfig.Port
app.listen(port, IP);

console.log(`静态服务器启动成功, 访问地址 http://${IP}:${port}`);
