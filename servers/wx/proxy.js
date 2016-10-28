/**
 * 做请求转发的代理
 * Created by zhangye on 16/10/28.
 */

const fetch = require('node-fetch');

module.exports = function () {
    return fetch.apply(null, arguments).then(function (res) {
        return res.text()
    })
};