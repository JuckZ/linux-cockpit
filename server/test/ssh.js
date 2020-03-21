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
const myssh = new events.EventEmitter()
// 用于表示shell是否准备就绪
let isReady = false

  conn.connect({
    host: 'juck.site',
    port: 22,
    username: 'root',
    password: 'Zc1998zc'
  })

    // 错误处理
  conn.on('error', (err) => {
    console.log('======================')
    console.log(err.toString())
    console.log('======================')
  })
  // 就绪处理
  conn.on('ready', () => {
    isReady = true
    console.log('client ready')
    myssh.emit('commandSSH','ls')
    
  });
// 直接调用异步操作，然后await他的结果



    // 当收到客户端uploadCommand事件即调用命令
    // 当有输入时，则执行输入
myssh.on('commandSSH',(command) => {
//         conn.exec(command, (err, stream) => {
//     if (err) throw err;
//     stream.on('close', function (code, signal) {

//     }).on('data', function (data) {
//       console.log('STDOUT: ' + data);
//     }).stderr.on('data', function (data) {
//       console.log('STDERR: ' + data);
//     });
//   })

    conn.shell((err, stream) => {
        if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('OUTPUT: ' + data);
    });
    stream.end(command+'\n');
    })
})

process.stdin.on('readable',()=>{
      let chunk;
  // 使用循环确保我们读取所有的可用数据。
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`数据: ${chunk}`);
    myssh.emit('commandSSH',chunk.toString().trim())
  }
})