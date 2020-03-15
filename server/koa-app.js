const Koa = require('koa');
const path = require('path')
const serve = require('koa-static')
const Router = require('@koa/router')
// const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const router = new Router()

// 获取koa请求参数的3种方法
// ctx.query ctx.params ctx.request.body

app.use(bodyParser()) 

const home   = serve(path.join(__dirname)+'/public/');
router.post('/api/login',(ctx, next) => {
    console.log("++++++++++Login+++++++++++++")
    console.log(ctx.request.body)
    console.log("+++++++++++Login++++++++++++")
    ctx.response.status=200
    // ctx.status=200
    // ctx.response.type='json'
    // ctx.response.body=ctx.request.body
    ctx.response.body=JSON.stringify({
        "name":'jjjjj',
        "password": 123
    })
})
router.get('/api/test',(ctx, next) => {
    console.log("++++++++++TEST+++++++++++++")
    console.log(ctx.params)
    console.log("++++++++++TEST+++++++++++++")
    ctx.response.status=200
    ctx.response.type='json'
    ctx.response.data=ctx
})
app.use(router.routes()).use(router.allowedMethods())
app.use(home)

app.listen(80);