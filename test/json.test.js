/**
 * @description test json
 * @author Thanatos
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })

    expect(res.body.title).toBe('koa2 json')
})


test('json 接口发送pose请求，返回正确格式', async () => {
    const res = await server.post('/login').send({
        userName: 'chdlovejob',
        password: '123321'
    })
    // expect(res.body).toBe()
})