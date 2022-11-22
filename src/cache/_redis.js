/* 
    @descriotion 连接 redis 的方法 get set
    @author Thanatos
*/

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')


// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)    // 端口号和域名

// 监听redis错误
redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }

            try {   // 尝试按照对象处理
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })

    return promise
}


/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 秒
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    // 设置key和过期时间
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}