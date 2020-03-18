/**
 * TODO:端口号自定义
 * 登录验证工具
 * 暴露出的api接口接受4个参数：ip地址、用户名、密码、是否记住密码
 * 验证信息正确性，如果正确，则创建并返回conn对象（用户shell交互），如果不正确，则返回错误信息
 * 如果记住密码，则还需要将密码加密存储
 */

const Client = require('ssh2').Client;
const conn = new Client();
const Login = (IP, userName, password, remember) => {
  conn.connect({
    host: IP,
    port: 22,
    username: userName,
    password: password
  });
}

module.exports = {
  conn: conn,
  Login: Login
}
