/*
 * @Author: Juck
 * @Date: 2020-04-02 11:30:46
 * @LastEditTime: 2020-04-29 22:23:38
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
  // 当前运行的appID
  focusAppID: -1,
  // 登录之后应该启动的app（数组）
  toRunApps: [],
  // 配置app，管理app的状态（安装或者卸载等）
  /**
   * id: app的唯一标识
   * name: app的英文名称
   * chineseName: app的中文名称
   * componentName: app注册组件所用名称,
   * path: app组件的路径
   * imgSrc: app图标路径
   * inDesktop: 图标是否在桌面显示
   * inStartMenu: 图标是否在开始菜单中显示
   * requireAuth: 是否需要验证才能访问
   * status {  
   *    show: 是否显示
   *    installed: 是否已经安装
   *    focus: 是否为置顶聚焦状态
   *    window: 窗口的显示状态（minimize, fullscreen, tray, default）
   *    running: 是否正在运行
   *    position {
   *      left: 窗口的横坐标
   *      top: 窗口的纵坐标
   *      width: 窗口宽度
   *      height: 窗口高度
   *    }
   * }
   *    version: app的版本号
   *    author: app的作者
   */
  apps: [],
  // 当前focus的app
  currentFocusAppID: -1,
  // 用户头像等信息
  avatar: {
    username: 'juck',
    usergroup: 'root',
    avatarSrc: '/assets/win7/avatar.png',
  },
  // 菜单右侧 - 其他信息
  otherInfo: [
    { id: 1, name: 'admin', path: '' },
    { id: 2, name: '个人中心', path: '' },
    { id: 3, name: '我的应用', path: '' },
    { id: 4, name: '系统设置', path: '' },
    { id: 5, name: 'GitHub', path: '' },
  ],
  // appInfo
  appInfo: {
    Name: 'linux-cockpit',
    Author: 'Juck',
    Version: '0.0.1',
    SourceCode: 'https://github.com/JuckZ/linux-cockpit',
  }
}
