const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

// 路由
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')

// 常量
const { SECRET } = require('./conf/constants')

// error handler
let onerrorConf = {}
if (isProd) {
	onerrorConf = {
		redirect: '/error'
	}
}
onerror(app, onerrorConf)

// jwt中间件，其他页面需要jwt验证，不然就在访问后会401
app.use(jwtKoa({
	secret: SECRET
}).unless({
	path: [/^\/login/, /^\/register/]	// 自定义哪些目录不需要 jwt 验证
}))

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
	extension: 'ejs'
}))

// session配置
app.keys = ['USIsjsk_393@$1107']
app.use(session({
	key: 'weibo.sid',  // cookie name 默认是 koa.sid
	prefix: 'weibo:sess:',  // redis key 的前缀，默认是 koa:sess:
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000  // ms
	},
	// ttl: 24 * 60 * 60 * 1000, // redis过期时间，默认和cookie的maxAge一样
	store: redisStore({
		all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
	})
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
