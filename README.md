<!--
 * @Author: Juck
 * @Date: 2020-03-14 09:46:58
 * @LastEditTime: 2020-04-10 16:29:38
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\README.md
 * @Juck is coding...
 -->
# linux-cockpit

## 项目介绍

为什么 WebSocket 协议是更好的选择？
一般来说，WebSockets 会是更好的选择。
长轮询在服务器上占用更多的资源，而 WebSockets 在服务器上占用的空间很少。长轮询还需要在服务器与许多设备之间进行多次通信。而不同的网关对于一个常规连接允许保持打开的时间有不同的标准。如果连接打开时间太久，其进程可能会被杀死，甚至当这个进程正在处理一些重要的事情时。
使用 WebSockets 构建应用的理由：

全双工异步消息传送。换句话说，客户端和服务器都可以独立地相互传输消息。
WebSockets 无需任何配置即可通过大多数防火墙。
良好的安全模式（基于原始的安全模式）。

作者：江不知
链接：https://juejin.im/post/5d0b1381e51d455a694f9544
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

装逼  平时的命令不用记住  
节省环境配置成本（时间/金钱）  
帮助新手快速搭建环境 有限时间内进行快速开发  

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目创建步骤

// 工具 nodemon http-server 等 可以在测试时候使用
yarn global add typescript @vue/cli
vue create linux-cockpit
// 注意less版本一定是2.x.x，不然会报错，也可以使用3，但是需要配置
yarn add less@2.7.3 less-loader node-sass sass-loader electron babel-plugin-import -D //babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件
yarn add ant-design-vue vue-router vuex ssh2 xterm koa koa-static @koa/router koa-views axios vue-axios @koa/cors@2 xterm-addon-attach xterm-addon-fit xterm-addon-search graphql vue-apollo apollo-boost apollo-server-koa socket.io animate.css
vue3安装graphql也可使用vue add apollo

使用 vue-cli 3 的小伙伴，修改babel.config.js文件，配置 babel-plugin-import

```babel.config.js
 module.exports = {
  presets: ["@vue/app"],
+  plugins: [
+    [
+      "import",
+      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
+    ]
+  ]
};
```

package.json中修改vue的配置，将publicPath修改为合适的值，然后添加运行脚本，方便启动调试

vue.config.js中配置less，以便自定义antdesign主题，和支持less3版本以上
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  }
}


## API

1. 天气查询
  i.tianqi.com/index.php?c=code&id=55
2. bing每日壁纸
  https://bing.biturl.top/
3. 

## 图层

z-index影响交互，暂不添加 壁纸除外
<!-- 壁纸 -5
桌面 -4
任务栏 -3
开始菜单 -3
app -2
警告等弹窗 -1
其他默认 -->