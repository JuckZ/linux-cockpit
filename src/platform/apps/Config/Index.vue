<!--
 * @Author: Juck
 * @Date: 2020-04-12 09:39:39
 * @LastEditTime: 2020-05-01 10:01:16
 * @LastEditors: Juck
 * @Description: 用于创建app、配置登录信息等操作
 * @FilePath: \linux-cockpit\src\platform\apps\Config\Index.vue
 * @Juck is coding...
 -->
<template>
    <div id="config">config</div>
</template>

<style lang="scss">
#config {
  position: fixed;
}
* {
  user-select: none;
}
</style>

<script>
import BUS from '@/platform/bus'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  components: {
    
  },
  computed: {
    ...mapState('config',{
      
    })
  },
  created() {
    class App {
      // 构造函数
      constructor(
        id,
        name,
        chineseName,
        componentName,
        path,
        imgSrc,
        inDesktop = false,
        inStartMenu = false,
        requiredAuth = true,
        show = false,
        installed = true,
        focus = false,
        window = 'default',
        running = false,
        left = '10px',
        top = '50px',
        width = '800px',
        height = '400px',
        version = 'V0.0.1',
        author = 'Juck'
      ) {
        this.id = id
        this.name = name
        this.chineseName = chineseName
        this.componentName = componentName
        this.path = path
        this.imgSrc = imgSrc
        this.inDesktop = inDesktop
        this.inStartMenu = inStartMenu
        this.requiredAuth = requiredAuth
        this.status  = {}
        this.status.show = show
        this.status.installed = installed
        this.status.focus = focus
        this.status.window = window
        this.status.running = running
        this.status.position = {}
        this.status.position.left = left
        this.status.position.top = top
        this.status.position.width = width
        this.status.position.height = height
        this.version = version
        this.author = author
      }
      // Getter
      // 获取带单位的位置信息
      get positionWithUnit() {
        return {
          left: this.status.position.left+'px',
          top: this.status.position.top+'px',
          width: this.status.position.width+'px',
          height: this.status.position.height+'px'
        }
      }
      // Method
      calcArea() {
        return this.status.position
      }
    }
    // 创建apps并存入到vuex中
    const apps = []
    // 创建apps要用到的参数
    const appsParameter = [
      [0, 'login', '登录', 'Login', '@/platform/apps/Login', '/assets/apps/Login/logo.png', true, false, false, false, true, false, 'default', false, 360, 60, 800, 400, 'V0.0.1', 'Juck'],
      [1, 'shell', '终端', 'Shell', '@/platform/apps/Shell', '/assets/apps/Shell/logo.png', true, true, true, false, true, false, 'default', false, 60, 60, 800, 500, 'V0.0.1', 'Juck'],
      [2, 'fileManager', '文件管理器', 'FileManager', '@/platform/apps/FileManager', '/assets/apps/FileManager/logo.png', true, true, true, false, true, false, 'default', false, 260, 60, 800, 620, 'V0.0.1', 'Juck'],
      [3, 'taskManager', '任务管理器', 'TaskManager', '@/platform/apps/TaskManager', '/assets/apps/TaskManager/logo.png', true, true, true, false, true, false, 'default', false, 60, 60, 600, 600, 'V0.0.1', 'Juck'],
      [4, 'appStore', '应用市场', 'AppStore', '@/platform/apps/AppStore', '/assets/apps/AppStore/logo.png', true, true, true, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [5, 'personalCenter', '个人中心', 'PersonalCenter', '@/platform/apps/PersonalCenter', '/assets/apps/PersonalCenter/logo.png', false, true, true, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [6, 'systemSettings', '系统设置', 'SystemSettings', '@/platform/apps/SystemSettings', '/assets/apps/SystemSettings/logo.png', false, true, true, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [7, 'weather', '天气', 'Weather', '@/platform/apps/Weather', '/assets/apps/Weather/logo.png', false, true, false, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [8, 'weChat', '微信', 'Wechat', '@/platform/apps/Wechat', '/assets/apps/Wechat/logo.png', false, true, false, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [9, 'iClock', '时钟', 'IClock', '@/platform/apps/IClock', '/assets/apps/IClock/logo.png', false, true, false, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
      [10, 'aMap', '高德地图', 'AMap', '@/platform/apps/AMap', '/assets/apps/AMap/logo.png', false, true, false, false, true, false, 'default', false, 60, 60, 400, 400, 'V0.0.1', 'Juck'],
    ]
    for( const item of appsParameter) {
      apps.push(new App(...item))
    }
    this.initApps(apps)
  },
  methods: {
    //   
    ...mapActions({
      initApps: 'config/initApps'
    })
  },
}
</script>
