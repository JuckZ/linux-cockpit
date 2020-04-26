<!--
 * @Author: Juck
 * @Date: 2020-03-21 13:14:41
 * @LastEditTime: 2020-04-25 22:30:35
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\TODO.md
 * @
 -->

# Hello

TODO

shell连接，销

1. 文件管理器：
   目录部分可以制作下拉菜单，点击下拉菜单触发请求。
   data中存储文件名和绝对路径，可取属性（时间，pwd拼接绝对路径，所属组和用户，大小）
2. socket.io emitter.setMaxListeners()
3. socket.setMaxListeners(1)
4. io.sockets.setMaxListeners(1)
5. 通知栏（比如安装软件成功，卸载成功等）也是通过mapAction获取返回值（异步，因为服务端安装成功后回显需要时间），然后。。。

FIXME

1. main.ts中的apollo是否可以去掉
2. 如果不断开socket链接，会有多个相同的socket绑定在同一个shell上，每次发送和回显命令都是重复的
3. 向任务栏添加运行的程序时，后运行的程序应该将图标放置到最后，（解决办法，可以按照打开顺序设置PID，按照PID的大小排列图标即可）

BUG

Desktop组件销毁后使用vuex销毁io链接
electron跨域问题，尽量使用proxy方式，而不是cors方式

TAG TODO now

1. token问题 jwt  iframe 第三方页面怎么嵌入进来
2. relative absolute fixed flex
3. 写论文 paperfree查询论文重复率

路由transition

## 应用

1. dplayer
2. echats数据动态展示（系统内存、CPU等信息实时展示）

## 样式

1. 对于尺寸不合适的图标进行p图
2. 毛玻璃效果

## 功能

集成一些线上的功能，如Uzer.me上的东西，在线的PS，在线的office编辑功能等等  
充分运用curl

1. isLogined登录状态持久化存储，app退出后依然可以设置
2. 回收站
3. 邮件发送
4. 常用环境自动配置（采用docker方式，端口映射等提前设置好，以及自定义代码文件夹等）

## 安全

1. shell传输加密
2. graphql axios都要设置token逻辑
3. 过期时间

## 个性配置

1. 密码过期时间
2. 桌面壁纸（自动切换时间），上传图片到壁纸文件夹等
3. 主题，内置几种主题配置，也可以自己配置每一项（如字体大小、颜色、过渡效果等，mac过渡效果）
4. 修改鼠标指针

## SHELL

1. 身份验证
2. 退格边界,以及退格到上一行
3. 组件化
4. 加密传输
5. 组合键 vue修饰键
6. 未退出的客户端处理（销毁）

## 其他场景

1. 多台服务器的管理
2. 切换登录用户或者服务器
3. 用户之间的聊天（不同主机，不同用户之间或者相同主机不同用户之间）
4. 邮件发送日志等（危险操作或者可疑的操作）
5. 资源不足的报警功能

## 完善

1. VueDragResize美化
2. 注解
3. 清理console.log等开发时使用的调试语句
4. doc完善
5. 脚本完善
6. README.md完善
7. js文件转ts文件
8. Decorator重构Koa路由策略
9. 窗口最小化后应该到托盘中
10. 框架间更好的整合，electron-forge、vue-electron
11. watch监控computed中mapState中的变化
12. 多个SHELL支持（socket命名空间、多个socket连接）

## 已解决问题

1.hello this is my world
2.hello

## 图标

1. 用户管理
2. 网络管理
3. 防火墙
