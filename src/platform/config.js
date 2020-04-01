export default {
  // 默认配置 TODO: 可以考虑存入数据库，从而实现界面可视化动态配置
  // 组件对照表
  components: {
    // 登录
    Login: {
      name: 'Login',
      parent: './apps',
      path: './apps/Login/',
      component: 'Index.vue',
      store: 'store/index.js',
      props: {
        title: String,
        requiredAuth: Boolean,
        author: Object,
        install: Function,
        uninstall: Function,
      },
    },
    // 桌面
    Desktop: {
      name: 'Desktop',
      parent: './apps',
      path: './apps/Desktop/',
      component: 'Index.vue',
      store: 'store/index.js',
      props: {
        title: String,
        requiredAuth: Boolean,
        author: Object,
        install: Function,
        uninstall: Function,
      },
    },
    // 壁纸
    Wallpaper: {
      name: 'Wallpaper',
      path: './apps/Wallpaper/',
      component: 'Index.vue',
      store: 'store/index.js',
      props: {
        title: String,
        requiredAuth: Boolean,
        author: Object,
        install: Function,
        uninstall: Function,
      },
    },
  },
}
