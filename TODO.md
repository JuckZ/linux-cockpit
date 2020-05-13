<!--
 * @Author: Juck
 * @Date: 2020-03-21 13:14:41
 * @LastEditTime: 2020-05-13 11:31:31
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\TODO.md
 * @
 -->

# Hello

1. 增加tray组件（点击关闭时，可以选择是否退出或在托盘运行，也可以保存当前选择，下次不再提醒）

FIXME

1. main.ts中的apollo是否可以去掉
2. 向任务栏添加运行的程序时，后运行的程序应该将图标放置到最后，（解决办法，可以按照打开顺序设置PID，按照PID的大小排列图标即可）
3. 每次清空session登录时，appllo问题

BUG

electron跨域问题，尽量使用proxy方式，而不是cors方式

TAG TODO now

1. token问题 jwt  iframe 第三方页面怎么嵌入进来
2. 写论文 paperfree查询论文重复率

## 样式

1. 毛玻璃效果
2. 图标尺寸优化
3. 用户管理
4. 网络管理
5. 防火墙
6. 时钟等挂件自动隐藏标题栏，并加入到托盘中
7. scss ？ 元素等使用变量，然后通过配置文件初始化变量，完成主题自定义
8. 所有组件都可以拖拽，修改大小和位置。（有一定的限制。）
9. 动画效果 app显示和隐藏，以及最小化（根据任务栏图标的位置设置动画）

## 功能

集成一些线上的功能，如Uzer.me上的东西，在线的PS，在线的office编辑功能等等  
充分运用curl

## vscode-online

## 安全

1. graphql axios都要设置token逻辑
2. 过期时间

## 个性配置

1. 密码过期时间
2. 桌面壁纸（自动切换时间），上传图片到壁纸文件夹等
3. 主题，内置几种主题配置，也可以自己配置每一项（如字体大小、颜色、过渡效果等，mac过渡效果）
4. 修改鼠标指针

## 完善

### 资源监视器

1. i3-bar等实时状态栏
2. 专门看系统信息的文件夹（动态更新）
3. Zabbix 用来监控系统

### 设置中心

1. 网络设置
2. 镜像源设置
3. 防火墙设置
4. 其他

## 其他场景

1. 多台服务器的管理
2. 切换登录用户或者服务器
3. 用户之间的聊天（不同主机，不同用户之间或者相同主机不同用户之间）
4. 邮件发送日志等（危险操作或者可疑的操作）
5. 资源不足的报警功能

### Config组件

1. 变成默认读取配置文件
2. 增加登录信息、壁纸、头像、主题等等配置

### 文件管理器

1. 显示隐藏文件
2. 预览会自动将文件下载到临时目录下，如果后面点击下载，则直接保存这个已经下载的目录，提供清理缓存的功能
3. 菜单收起
4. dplayer vue-video-player
5. 回收站的清空和还原
6. 添加和删除标签页

### SHELL终端

1. ssh exit之后的操作？
2. 多个shell
3. 退格边界,以及退格到上一行
4. 加密传输
5. 组合键 vue修饰键

## 浏览器

1. 浏览器功能，内置linux学习等书签

### 文本编辑器

1. 编辑配置文件
2. json加载，解析yml也可以

### 软件管理器

1. 安装用户需要的环境（比如LAMP）
2. docker等
3. 常用环境自动配置（采用docker方式，端口映射等提前设置好，以及自定义代码文件夹等）

### 便签

### 滴答清单

### 闹钟

### 音乐播放器

### 视频播放器

### 通知栏

1. 关键，先将通知分类（来源：app安装和登录等信息、app的提醒信息如备忘录、闹钟等、Linux软件安装成功等，用户之间通信、资源不足等提醒），通知类型（警告、信息、错误、日志等）
2. 比如安装软件成功，卸载成功等
3. linux不同用户之间的对话和留言

### 核心

1. iframe无法监听document事件，拖动大小时有点BUG
2. 端口占用问题
3. 权限问题，执行了没有root权限的root命令  cd  sudo su都不能执行
4. 新的思路：sh + curl(获取的在线脚本，因为可以实时更新)
5. 同个软件可以多开
6. i18N
7. shell部分可以尝试使用命名空间区别是那个app发送的命令

### 其他

1. 注解
2. doc完善
3. 脚本完善
4. README.md完善
5. js文件转ts文件
6. Decorator重构Koa路由策略
7. 窗口最小化后应该到托盘中
8. 框架间更好的整合，electron-forge、vue-electron
9. 多个SHELL支持（socket命名空间、多个socket连接）
10. 文件管理器搜索功能、菜单收起功能、左侧菜单滚动效果
11. 多个桌面
12. 支持局域网nat，管理自己的服务器
13. 如何让组件保持生命
14. vue监控数组变化、对象变化  computed watch

## 初始化centos做了哪些事

1. 修改网络配置

    ```bash
    vi /etc/sysconfig/network-scripts/ifcfg-ens33
    # ONBOOT=yes
    ```

2. 修改sshd配置

    ```bash
    vi /etc/ssh/sshd_config
    # https://blog.csdn.net/trackle400/article/details/52755571
    ```

3. 添加测试文件

```bash

mkdir Pictures Public Videos Music Downloads Documents Desktop .transh
```


### 备份API

预览表格  https://sheetjs.com/
预览PDF  https://github.com/mozilla/pdf.js
预览word 结合firefox send  使用在线api
https://transfer.sh/
https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls
https://docs.google.com/viewer?url="fileurl"
学习https://cockpit-project.org/guide/latest/的思想