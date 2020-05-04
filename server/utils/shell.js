/*
 * @Author: Juck
 * @Date: 2020-03-14 11:30:18
 * @LastEditTime: 2020-05-04 09:53:40
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\utils\shell.js
 * @Juck is coding...
 */
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
const fs = require('fs')
const path = require('path')
let conn = null;
// 用于表示shell是否准备就绪
let isReady = false
// 存储socket对象
let mySocket = null
// 存储所有连接的socket对象
const users = []
// 自定义参数
// 登录超时时间
const timeToLogin = 3000
const timeToCommand = 3000
const timeToLoginEvent = new events.EventEmitter();
const timeToCommandEvent = new events.EventEmitter();
const timeToCommandTimer = () => {}
let timeToLoginTimer = () => {}
const {
  myBUS
} = require('./BUS')


/**
 * 描述：下载文件
 */
function DownloadFile(remotePath, localPath, then) {
  conn.sftp((err, stfp) => {
    if (err) {
      then(err)
    } else {
      stfp.fastGet(remotePath, localPath, (err, result) => {
        if (err) {
          then(err)
        } else {
          console.log(result);
          then(err, result)
        }
      })
    }
  })
}

// 运行脚本
function execUploadScript(script, originPayload) {
  console.log(script);
  conn.exec(script, function (err, stream) {
    if (err) throw err;
    stream.on('close', function () {
      // conn.end();
    }).on('data', function (data) {
      mySocket.emit('scriptRes', {
        chunk: data.toString(),
        originPayload: originPayload
      })
      console.log('=====');
      console.log(data.toString());
    });
  })
}

const initSocket = socket => {
  mySocket = socket
  // 创建shell
  if (isReady) {
    conn.shell(function (err, stream) {
      if (err) throw err;
      stream.on('close', function () {
        // conn.end();
      }).on('data', function (data) {
        // mySocket.emit('commandRes',data.toString())
        mySocket.emit('commandRes', data.toString())
      });
      conn.on('uploadCommand', (command) => {
        stream.write(command + '\n')
      })
    });
  }
}

// 直接调用异步操作，然后await他的结果
// privateKey: require('fs').readFileSync('/here/is/my/key')
const connectSSH = async (domainOrIP, userName, password, remember) => {
  // 先清除conn的所有监听事件
  // conn.removeAllListener([])
  conn = new Client();
  conn.connect({
    host: domainOrIP,
    port: 22,
    username: userName,
    password: password
  })
  // 就绪处理
  conn.once('ready', () => {
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
    timeToLoginEvent.once('timeToLoginRes', () => {
      resolve({
        isReady: isReady
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
  conn.emit('uploadCommand', command)
}

// 断开连接时，清除conn的事件监听器等
myBUS.on('disconnect', () => {
  console.log('disconnect here');
})
// 监听脚本上传事件
myBUS.on('uploadScript', payload => {
  let script = 'cd /'
  switch (payload.options.operation) {
    case 'open':
      if (payload.currentStatus.targets.length == 0) {
        console.log('没有操作对象')
      } else if (payload.currentStatus.targets.length == 1) {
        // 只有一个操作对象时
        const target = payload.currentStatus.targets[0]
        // 如果是普通文件，则用对应的预览器打开
        if (target.type == '-') {
          // 根据文件后缀用不同的预览器打开
          // 先判断是否有相应可以使用的预览器
          console.log('根据文件后缀用不同的预览器打开')
          switch (
            target.name
            .split('.')
            .pop()
            .toLowerCase()
          ) {
            case 'txt':
            case 'doc':
              console.log('调用文本编辑器')
              break
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'img':
              console.log('调用图片浏览器')
              break
            case 'mp3':
              console.log('调用音乐播放器')
              break
            case 'mp4':
              console.log('调用视频播放器')
              break
            default:
              console.log('暂时不支持此类型文件的预览')
          }
        } else if (target.type == 'd') {
          // 如果是目录文件，则打开目录
          // TODO target.name还需要加上当前路径srcDir
          console.log('打开目录' + payload.currentStatus.srcDir + target.name)
          script = 'cd ' + payload.currentStatus.srcDir + '/' + target.name + ' && ls -lh'
          execUploadScript(script, payload)
        } else {
          // 如果是块设备文件等，则不进行操作
          console.log('暂不支持打开块设备')
        }
      }
      break
    case 'moveToTrash':
      console.log('移入回收站')
      break
    case 'attributes':
      console.log('属性')
      break
    default:
      console.log('其他操作等待开发')
  }

  // switch(payload.options.operation) {
  //   case 'open':
  //     // if(payload.options.target)
  //   script = 'ls /root -lh'
  //   // script = 'curl https://raw.githubusercontent.com/JuckZ/linux-scripts/master/FileManager/main.sh | sh'
  //   conn.exec(script, function (err, stream) {
  //     if (err) throw err;
  //     stream.on('close', function () {
  //       // conn.end();
  //     }).on('data', function (data) {
  //       mySocket.emit('scriptRes', {
  //         chunk: data.toString(),
  //         originPayload: payload
  //       })
  //       console.log('=====');
  //       console.log(data.toString());
  //     });
  //   })
  //   break
  //   case 'downloadFile':
  //     DownloadFile(...payload.options.params)
  //     break
  //   default:
  //     console.log('no operation here');
  // }
})

module.exports = {
  connectSSH: connectSSH,
  commandSSH: commandSSH,
  initSocket: initSocket
}