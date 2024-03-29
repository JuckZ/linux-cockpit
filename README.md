# linux-cockpit

## Screen recording

[![](https://raw.githubusercontent.com/JuckZ/linux-cockpit/master/doc/linux-cockpit.jpg)](https://www.bilibili.com/video/BV1it4y11712)

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
yarn add ant-design-vue vue-router vuex ssh2 xterm koa koa-static @koa/router koa-views axios vue-axios @koa/cors@2 xterm-addon-attach xterm-addon-fit xterm-addon-search graphql vue-apollo apollo-boost apollo-server-koa socket.io
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
