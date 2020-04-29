/*
 * @Author: Juck
 * @Date: 2020-04-02 11:30:46
 * @LastEditTime: 2020-04-29 10:22:06
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
  apps1: [
    {
      id: 0,
      name: 'shell',
      chineseName: '终端',
      componentName: 'Shell',
      path: '@/platform/apps/Shell',
      imgSrc: '/assets/apps/Shell/logo.png',
      inDesktop: true,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        show: false,
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 0,
          top: 0,
          width: 800,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 1,
      name: 'fileManager',
      chineseName: '文件管理器',
      componentName: 'FileManager',
      path: '@/platform/apps/FileManager',
      imgSrc: '/assets/apps/FileManager/logo.png',
      inDesktop: true,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 400,
          top: 200,
          width: 840,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 2,
      name: 'taskManager',
      chineseName: '任务管理器',
      componentName: 'TaskManager',
      path: '@/platform/apps/TaskManager',
      imgSrc: '/assets/apps/TaskManager/logo.png',
      inDesktop: true,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 200,
          top: 50,
          width: 800,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 3,
      name: 'appStore',
      chineseName: '应用市场',
      componentName: 'AppStore',
      path: '@/platform/apps/AppStore',
      imgSrc: '/assets/apps/AppStore/logo.png',
      inDesktop: true,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 0,
          top: 0,
          width: 800,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 4,
      name: 'personalCenter',
      chineseName: '个人中心',
      componentName: 'PersonalCenter',
      path: '@/platform/apps/PersonalCenter',
      imgSrc: '/assets/apps/PersonalCenter/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 0,
          top: 0,
          width: 800,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 5,
      name: 'systemSettings',
      chineseName: '系统设置',
      componentName: 'SystemSettings',
      path: '@/platform/apps/SystemSettings',
      imgSrc: '/assets/apps/SystemSettings/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: true,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 0,
          top: 0,
          width: 800,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 6,
      name: 'weather',
      chineseName: '今日天气',
      componentName: 'Weather',
      path: '@/platform/apps/Weather',
      imgSrc: '/assets/apps/Weather/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: false,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 30,
          top: 0,
          width: 600,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 7,
      name: 'weChat',
      chineseName: '微信',
      componentName: 'WeChat',
      path: '@/platform/apps/WeChat',
      imgSrc: '/assets/apps/WeChat/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: false,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 50,
          top: 0,
          width: 400,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 8,
      name: 'iClock',
      chineseName: '时钟',
      componentName: 'IClock',
      path: '@/platform/apps/IClock',
      imgSrc: '/assets/apps/IClock/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: false,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 60,
          top: 20,
          width: 200,
          height: 200
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 9,
      name: 'aMap',
      chineseName: '高德地图',
      componentName: 'AMap',
      path: '@/platform/apps/AMap',
      imgSrc: '/assets/apps/AMap/logo.png',
      inDesktop: false,
      inStartMenu: true,
      requiredAuth: false,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: 60,
          top: 60,
          width: 400,
          height: 400
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    },
    {
      id: 10,
      name: 'login',
      chineseName: '登录',
      componentName: 'Login',
      path: '@/platform/apps/Login',
      imgSrc: '/assets/apps/Login/logo.png',
      inDesktop: false,
      inStartMenu: false,
      requiredAuth: false,
      status: {
        installed: true,
        focus: false,
        window: 'default',
        running: false,
        position: {
          left: '60px',
          top: '60px',
          width: '400px',
          height: '400px'
        }
      },
      version: 'V0.0.1',
      author: 'Juck'
    }
  ],
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
