<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-23 16:39:02
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Desktop\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="desktop">
    <!-- 壁纸模块 -->
    <Wallpaper />
    <!-- 桌面快捷方式 -->
    <DesktopIcons />
    <!-- 状态栏 -->
    <StatusBar />
    <!-- 任务栏 展示当前运行中的任务 -->
    <TaskBar />
    <!-- 徽标菜单 -->
    <Menu />
    <!-- 遮罩层，用于放置运行中的程序 -->
    <RunningAppsLayer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 导入事件BUS
import BUS from '@/platform/bus'
// 导入桌面的小组件
import Wallpaper from '@/platform/apps/Wallpaper/Index.vue'
import StatusBar from '@/platform/apps/StatusBar/Index.vue'
import TaskBar from '@/platform/apps/TaskBar/Index.vue'
import Menu from '@/platform/apps/Menu/Index.vue'
import DesktopIcons from '@/platform/apps/DesktopIcons/Index.vue'
import RunningAppsLayer from '@/platform/apps/RunningAppsLayer/Index.vue'
export default {
  data() {
    return {}
  },
  name: 'desktop',
  components: {
    Wallpaper,
    StatusBar,
    TaskBar,
    RunningAppsLayer,
    Menu,
    DesktopIcons
  },
  computed: {
    ...mapState('login', {
      isLogined: 'isLogined',
      userInfo: 'userInfo',
      socket: 'socket'
    })
  },
  mounted() {
    // 监听isLogined，如果为true，则给socket绑定监听事件，控制销毁
    BUS.$on('socketInitialized', () => {
      console.log('socketInitialized');
      this.socket.on('disconnect', () => {
    // socket.open();
      console.log('socket disconnect');
    });
    })
    
    // 每次刷新后vuex的值会清除掉，因此在这里将登录状态从sessionStorage中恢复到vuex中
    if(sessionStorage.getItem('isLogined')) {
      // 修改login值
      // 将sessionStorage中的userInfo用于登录，本质是存入
      this.restoreLogin(sessionStorage.getItem('userInfo'))
    }
    console.log(process.env.NODE_ENV)
  },
  destroyed() {
    // FIXME似乎刷新触发得了destoryed但没有时间执行
    alert('des')
    console.log('destoryed');
    
  },
  methods: {
    // 
    ...mapActions({
      restoreLogin: 'login/restoreLogin',
      changeLoginType: 'login/changeLoginType'
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
</style>
