/**
 * @description sequelize 实例
 * @author Thanatos
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, datebase } = MYSQL_CONF

const conf = {
    host,
    dialect: 'mysql'
}

// 期望在单元测试时，不要打印sequelize打印
if (isTest) {
    conf.logging = () => {}
}


// 线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数
        min: 0, // 最小
        idle: 10000     // 如果一个连接池 10s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(datebase, user, password, conf)


module.exports = seq