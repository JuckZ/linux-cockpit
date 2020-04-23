<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-23 09:27:53
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
// 
  },
  mounted() {
    //
    console.log(process.env.NODE_ENV)
  },
  methods: {
    // 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
</style>
