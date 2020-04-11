<!--
 * @Author: Juck
 * @Date: 2020-03-21 13:14:41
 * @LastEditTime: 2020-04-11 13:46:24
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\TODO.md
 * @
 -->

# Hello



TODO

1. 文件管理器：
   目录部分可以制作下拉菜单，点击下拉菜单触发请求。
   data中存储文件名和绝对路径，可取属性（时间，pwd拼接绝对路径，所属组和用户，大小）
2. 增加全局样式定义
   {
       blurWindow: // 窗口未被focus时添加的效果（黑白）
   }


3. socket.io emitter.setMaxListeners()
4. 点击程序图标，则将程序加入到runningApp中，通过watch等方式监控runningApp的变化，如果发生改变，则在遮罩层添加或移除变化部分的应用
如何将app展示到div#runningApps中去呢

FIXME

1. main.ts中的apollo是否可以去掉
2. 如果不断开socket链接，会有多个相同的socket绑定在同一个shell上，每次发送和回显命令都是重复的

BUG

Desktop组件销毁后使用vuex销毁io链接
electron跨域问题，尽量使用proxy方式，而不是cors方式

TAG TODO now

1. 修改应用的显示方式为弹出层，而不是路由方式。（那怎么验证呢）
   思路：
   在desktop的wallpaper之上的图层加入一个遮罩层，用于防止routerview，容纳运行中的应用。（使用多个routerview，外包一层div，设置div的z-index值可以将focus状态的应用置顶）
2. token问题 jwt  iframe 第三方页面怎么嵌入进来
3. 应用运行时需要在任务栏可以看到。
4. relative absolute fixed flex
5. 写论文 paperfree查询论文重复率

vuex中增加一个application的状态值，用于记录是否需要重新渲染
所有api相关的、获取数据的操作都放入到vuex中去

vue slot
路由transition
JWT

## 应用

1. dplayer
2. echats数据动态展示（系统内存、CPU等信息实时展示）

## 样式

1. 对于尺寸不合适的图标进行p图
2. 首先要知道，vuex中的状态一旦页面刷新，就不再存在。所以为了实现在刷新页面时，仍然展现出用户头像，就需要从sessionStorage种提取状态再传值给vuex。

## 功能

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

1. 注解
2. 清理console.log等开发时使用的调试语句
3. doc完善
4. 脚本完善
5. README.md完善
6. js文件转ts文件
7. Decorator重构Koa路由策略
8. 窗口最小化后应该到托盘中

## 已解决问题

1.hello this is my world
2.hello

## 图标

1. 用户管理
2. 网络管理
3. 防火墙
