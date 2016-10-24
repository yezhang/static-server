/**
 * Created by zhangye on 16/10/24.
 */
'use strict';

const config = require('../config/configServer');

const hostConfig = {
    IP: '0.0.0.0',
    Port: 9000,
    Path: 'dist'
}

const app = config(hostConfig);

// 监听当前服务器的全部 IP 地址，以便代码在不同服务器移植。
var IP = hostConfig.IP;
/**
 * 端口 8000，用于企业空间内嵌 App。
 * @type {number}
 */
var port = hostConfig.Port
app.listen(port, IP);

console.log(`静态服务器启动成功, 访问地址 http://${IP}:${port}`);
