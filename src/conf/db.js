/* 
    @descripton 存储配置
    @author Thanatos
*/

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379, // redis默认端口号
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'samsungchd',
    port: 3306,
    database: 'koa_weibo'
}

// 线上配置
if (isProd) {
    REDIS_CONF = {
        port: 6379, // redis默认端口号
        host: '192.168.10.339'
    }
    MYSQL_CONF = {
        host: '192.168.147.585',
        user: 'didi',
        password: 'didi_global',
        port: 3306,
        database: 'koa_weibo'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}