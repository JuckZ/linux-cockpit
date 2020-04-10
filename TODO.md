<!--
 * @Author: Juck
 * @Date: 2020-03-21 13:14:41
 * @LastEditTime: 2020-04-10 17:12:52
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\TODO.md
 * @
 -->

# Hello

TODO

1. 增加全局样式定义
   {
       blurWindow: // 窗口未被focus时添加的效果（黑白）
   }


2. socket.io emitter.setMaxListeners()

FIXME

1. main.ts中的apollo是否可以去掉
2. 试试

BUG

Desktop组件销毁后使用vuex销毁io链接
electron跨域问题，尽量使用proxy方式，而不是cors方式

1. 路由守卫 用于验证页面的跳转，如果访问了需要验证的页面则提示需要登录并跳转到登录页面  // 将登录状态存到cookie或者session中或者localStorage
2. 对apps的打开状态、位置信息、窗口大小等信息进行保存，并且点击桌面空白时进行收起主菜单等
3. history模式的路由
4. relative absolute fixed flex
5. 写论文 paperfree查询论文重复率
6. 全局BUS 用于绑定事件通知、绑定router或者vuex或者axios等

vuex中增加一个application的状态值，用于记录是否需要重新渲染
所有api相关的、获取数据的操作都放入到vuex中去

vue slot
路由transition 
JWT

## 跨域问题

jsonp 淘汰
cors 后端解决方案
http proxy前端解决方案

## 应用

1. dplayer
2. echats数据动态展示（系统内存、CPU等信息实时展示）

## 样式

1. ??
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
5. 组合键
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

## 已解决问题

1.hello this is my world
2.hello

## 图标

1. 终端
2. 文件管理器（包括上传下载，拖动，批量操作等）
3. 用户头像
4. 用户管理
5. 进程管理
6. 系统内存等状态
7. 网络管理
8. 天气
9. 微信
10. PS
11. 应用商店
12. 防火墙
