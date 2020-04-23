<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-23 14:20:20
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
      userInfo: 'userInfo'
    })
  },
  mounted() {
    // 每次刷新后vuex的值会清除掉，因此在这里将登录状态从sessionStorage中恢复到vuex中
    if(sessionStorage.getItem('isLogined')) {
      // 修改login值
      // 修改userInfo
      this.login(sessionStorage.getItem('userInfo'))
    }
    console.log(process.env.NODE_ENV)
  },
  methods: {
    // 
    ...mapActions({
      login: 'login/login',
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
