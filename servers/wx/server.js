/**
 * 部署前端静态资源的服务器。
 * Created by zhangye on 16/9/23.
 */
'use strict';


const config = require('../config/configServer');
const configWx = require('./configWxServer')

const hostConfig = {
    IP: '0.0.0.0',
    Port: 1521, // 临时端口，借用 Oracle 的端口，上线时需要调整为真实接口
    Path: 'wx_dist'
}

const app = config(hostConfig, configWx);

// 监听当前服务器的全部 IP 地址，以便代码在不同服务器移植。
var IP = hostConfig.IP;
/**
 * 端口 8000，用于企业空间内嵌 App。
 * @type {number}
 */
var port = hostConfig.Port
app.listen(port, IP);

console.log(`静态服务器启动成功, 访问地址 http://${IP}:${port}`);