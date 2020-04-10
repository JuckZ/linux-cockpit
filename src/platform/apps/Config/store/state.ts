/*
 * @Author: Juck
 * @Date: 2020-04-02 11:30:46
 * @LastEditTime: 2020-04-10 16:57:33
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\state.ts
 * @Juck is coding...
 */
export default {
      // 默认配置 TODO: 可以考虑存入数据库，从而实现界面可视化动态配置
  settings: {
    wallpaper: {
      // 壁纸来源方式 application | network | server
      wallpaperOriginType: 'application',
      // 根据来源方式来设置路径，server对应一个路径path，network对应url，application对应public文件夹下的一张图
      wallpaperSrc: '/assets/win7/wallpaper.jpg',
    }
  },
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
  },
  // 配置app，管理app的状态（安装或者卸载等）
  apps: [
    {
      id:'1',
      name: 'shell',
      path: '@/platform/apps/Shell',
      imgSrc: '/assets/apps/Shell/logo.png',
      target: '/shell',
      status: {
        installed: true,
        focus: false,
        // 窗口显示状态：minimize，fullScreen，customize, default
        window: 'minimize',
        // 是否正在运行状态
        running: false
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id:'2',
      name: 'fileManager',
      path: '@/platform/apps/FileManager',
      imgSrc: '/assets/apps/FileManager/logo.png',
      target: '/fileManager',
      status: {
        installed: true,
        focus: false,
        window: 'minimize',
        running: false
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id:'3',
      name: 'taskManager',
      path: '@/platform/apps/TaskManager',
      imgSrc: '/assets/apps/TaskManager/logo.png',
      target: '/taskManager',
      status: {
        installed: true,
        focus: false,
        window: 'minimize',
        running: false
      },
      version: 'V0.0.1',
      author: 'Juck'
    }
  ],
}
