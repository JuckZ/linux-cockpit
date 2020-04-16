<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-12 09:43:41
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Desktop\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="desktop">
    <!-- 壁纸模块 -->
    <Wallpaper msg1="1111" />
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
import { mapState, mapActions } from 'vuex'
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
    ...mapState('config', {
      apps: 'apps'
    })
  },
  mounted() {
    //
    console.log(process.env.NODE_ENV)
  },
  methods: {
    ...mapActions({
      // 修改app运行状态
      setAppStatus: 'config/setAppStatus'
    }),
    // 处理点击桌面图标的事件
    targetHandler(e, payload) {
      this.setAppStatus(payload)
      // if (this.$route.path !== target) this.$router.push(target)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
</style>
