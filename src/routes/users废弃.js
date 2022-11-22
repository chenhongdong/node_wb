const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // 登录校验逻辑todo

  // ctx.body = {
  //   userName,
  //   password
  // }

  let userInfo
  if (userName === 'Thanatos' && password === 'fuckyou') {
    // 登录成功，获取用户信息
    userInfo = {
      uid: 1,
      userName: 'Thanatos',
      nickName: '小白',
      gender: 1  // 男
    }
  }

  // 加密 userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, {
      expiresIn: '1h' // 1小时后过期
    })
  }

  if (userInfo == null) {
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: token
  }
})

// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization

  try {
    const data = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: data
    }
  } catch (e) {
    ctx.body = {
      errno: -1,
      msg: 'verify token failed'
    }
  }
})

module.exports = router
