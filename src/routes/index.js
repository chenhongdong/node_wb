const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '你好 Koa 2!',
    subtitle: '很高兴来到koa的世界',
    isMe: true,
    blogList: [
      {id: 1, title: '米米智玩'},
      {id: 2, title: '天猫精灵'},
      {id: 3, title: '福临门'}
    ]
  })
})

// 返回json格式
router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum === null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
})

// 动态参数
router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: '这是个人页',
    userName
  }
})

// 多个动态参数
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: '这是分页',
    userName,
    pageIndex
  }
})

module.exports = router
