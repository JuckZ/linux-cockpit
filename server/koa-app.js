/*
 * @Author: Juck
 * @Date: 2020-03-15 12:46:16
 * @LastEditTime: 2020-04-26 09:35:29
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\koa-app.js
 * @Juck is coding...
 */
// 获取koa请求参数的几种方法
// ctx.query ctx.params ctx.request.body ctx.request.query ctx.request.params ctx.request.header
const Koa = require('koa');
const path = require('path')
const serve = require('koa-static')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const router = new Router()
const {
    server
} = require('./utils/graphql')
const {
    myBUS
} = require('./utils/BUS')
// 整合socket和Koa
const serverWithSocket = require('http').createServer(app.callback());
const io = require('socket.io')(serverWithSocket)
const {
    commandSSH,
    initSocket
} = require('./utils/shell.js')
const connections = []
let socketID = 0
io.on('connection', (socket) => {
    console.log('++++++++++++++ io connection ++++++++++++++')
    // 将socket对象共享到shell.js中
    socketID++
    connections.push({
        socketID,
        socket
    })
    initSocket(socket)
    socket.on('uploadCommand', (command) => {
        commandSSH(command)
    })
    socket.on('disconnect', () => {
        // 断开之后应该触发一个事件，销毁ssh连接
        myBUS.emit('disconnect')
        console.log('断开连接');
        socket.disconnect();
    })
})

//  错误处理中间件
const errorHandle = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            status: err.statusCode || err.status || 500,
            message: err.message,
            router: '错误处理中间件'
        }
    }
}

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
// app.listen(80);
serverWithSocket.listen(80)
server.applyMiddleware({
    app
})
console.log('Server running at port 80')