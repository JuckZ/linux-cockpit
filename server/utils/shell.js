/**
 * TODO:端口号自定义
 * 登录验证工具
 * 暴露出的api接口接受4个参数：ip地址、用户名、密码、是否记住密码
 * 验证信息正确性，如果正确，则创建并返回conn对象（用户shell交互），如果不正确，则返回错误信息
 * 如果记住密码，则还需要将密码加密存储
 * 
 * 自定义参数，如设置登录超时时间，命令回显超时时间等
 */
const events = require('events')
const Client = require('ssh2').Client;
const conn = new Client();
// 用于表示shell是否准备就绪
let isReady = false
// 存储socket对象
let mySocket = null
// 自定义参数
// 登录超时时间
const timeToLogin = 3000
const timeToCommand = 3000
const timeToLoginEvent = new events.EventEmitter();
const timeToCommandEvent = new events.EventEmitter();
let timeToCommandTimer = () => {}
let timeToLoginTimer = () => {}

const initSocket = socket => {
  mySocket = socket
  // 创建shell
  if(isReady)
  conn.shell(function (err, stream) {
  if (err) throw err;
  stream.on('close', function () {
    // conn.end();
  }).on('data', function (data) {
    mySocket.emit('commandRes',data.toString())
  });
  conn.on('uploadCommand',(command) => {
    stream.write(command+'\n')
  })
});

}

// 直接调用异步操作，然后await他的结果
// privateKey: require('fs').readFileSync('/here/is/my/key')
const connectSSH = async (IP, userName, password, remember) => {
  conn.connect({
    host: IP,
    port: 22,
    username: userName,
    password: password
  })

  // 就绪处理
  conn.on('ready', () => {
    isReady = true
    // 清除登录超时计时器，触发登录成功事件（即向客户端发送登录成功的响应）
    clearTimeout(timeToLoginTimer)
    timeToLoginEvent.emit('timeToLoginRes')
  });
  // 错误处理
  conn.on('error', (err) => {
    console.log('======================')
    console.log(err.toString())
    console.log('======================')
  })

  return await new Promise((resolve, reject) => {
    // 登录最多5秒，如果没有就绪即超时
    timeToLoginEvent.on('timeToLoginRes', () => {
      resolve({
        isReady: isReady,
        conn: conn
      })
    })
    timeToLoginTimer = setTimeout(() => {
      // 触发事件，返回isReady状态给客户端
      timeToLoginEvent.emit('timeToLoginRes')
    }, timeToLogin)
  })
}

const commandSSH = (command) => {
  // 触发命令上传的监听事件
  conn.emit('uploadCommand',command)
}


module.exports = {
  connectSSH: connectSSH,
  commandSSH: commandSSH,
  initSocket: initSocket
}