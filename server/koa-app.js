const Koa = require('koa');
const path = require('path')
const serve = require('koa-static')
const Router = require('@koa/router')
const cors = require('@koa/cors')
// const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const fs = require('fs')
const router = new Router()
const { server } = require('./utils/graphql')



// 获取koa请求参数的3种方法
// ctx.query ctx.params ctx.request.body


let isLogin = false
const {
    conn,
    Login
} = require("./utils/login")
// 引入自定义的消息类型包
require("./utils/message")

// TODO:配置一个全部请求都要经过的路由，通过next方法进行后续匹配？，验证是否登录，未登录则返回一个信息，由前端路由跳转
const auth = ( ctx, next ) => {
    console.log(`验证登录情况和token等--- 方法： ${ctx.request.method} 路径：${ctx.request.path}`)
    next()
}

//  错误处理中间件
const errorHandle = async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            status:  err.statusCode || err.status || 500,
            message: err.message,
            router: "错误处理中间件"
        }
    }
}


router.get('/a', (ctx,next) => {
    // console.log(aa.bb)
    ctx.response.type = 'html'
    ctx.response.body = "<h1>hello juck</h1>"
    next()
})
// 登录验证
router.post('/api/login', async (ctx, next) => {
    const reqData = ctx.request.body
    console.log("接受的登录信息为：", reqData.IP, reqData.userName, reqData.password, reqData.remember)
    Login(reqData.IP, reqData.userName, reqData.password, reqData.remember)
    ctx.response.type='json'
    ctx.response.status = 200
    ctx.response.body = JSON.stringify({
        "type": "router",
        "msg": "OK",
        "code": 200,
        "data": "data is at here"
    })
    conn.on('ready', () => {
        console.log('Client :: ready');
        isLogin = true;
    })
    next()
})


// shell交互
router.post('/api/application/shell',async (ctx, next) => {
    const reqData = ctx.request.body
    console.log("shell交互：" + reqData.data)
    // sshClient conn接收传来的shell输入，并用于执行
    if (!isLogin) {
        console.log("未登录");
        ctx.response.status = 200
        ctx.response.body = JSON.stringify({
            "type": "application",
            "msg": "NotOK",
            "code": 404,
            "data": '您尚未登录'
        })
    } else {
        let flag = 8
        conn.shell((err, stream) => {
            if (err) throw err;
            stream.on('close', function () {
                console.log('Stream :: close');
                conn.end();
            }).on('data', function (data) {
                //  输出回显
                console.log('troot@juckali:~# ' + data.toString().trim());
                flag = 10
            });
            // stream.write(reqData.data)
            stream.write("echo 123\n")
        });


        // TODO: 1. 应该使用websocket交互  2.怎么实现异步
        ctx.response.status = 200
        ctx.response.body = JSON.stringify({
                "type": "application",
                "msg": "OK",
                "code": 200,
                // "data": 'troot@juckali:~# ' + data.toString().trim()
                "data": flag
        })

    }
    next()

})

// 错误处理中间件，要放在最前面
app.use(errorHandle)
// 允许跨域
app.use(cors())
app.use(bodyParser())
// 验证登录和token等
// app.use(auth)
// 静态资源目录配置
app.use(serve(path.join(__dirname) + '/public/'))
app.use(router.routes()).use(router.allowedMethods())
app.listen(80);
server.applyMiddleware({ app })
console.log(`Server running at port 80`)