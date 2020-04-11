<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-11 12:42:15
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
    <div id="desktopIcons">
      <ul>
        <li v-for="app in apps" :key="app.id">
          <a @click="targetHandler($event, app.target)"
            ><img :src="app.imgSrc" :alt="app.name"
          /></a>
        </li>
      </ul>
    </div>
    <!-- 状态栏 -->
    <StatusBar />
    <!-- 任务栏模块 -->
    <TaskBar />
    <!-- 徽标菜单 -->
    <Menu />
    <!-- 遮罩层，用于放置运行中的程序 -->
    <!-- <div id="runningApps">
      <button onclick="alert(111)">百度一下</button>
      <my-notFound></my-notFound>
    </div> -->
    
    <!-- Desktop的子路由 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Wallpaper from '@/platform/apps/Wallpaper/Index.vue'
import StatusBar from '@/platform/apps/StatusBar/Index.vue'
import TaskBar from '@/platform/apps/TaskBar/Index.vue'
import Menu from '@/platform/apps/Menu/Index.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  name: 'desktop',
  components: {
    Wallpaper,
    StatusBar,
    TaskBar,
    Menu
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
      runningApps: 'runningApps'
    })
  },
  mounted() {
    //
    console.log(process.env.NODE_ENV)
  },
  methods: {
    targetHandler(e, target) {
      if (this.$route.path !== target) this.$router.push(target)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
#desktopIcons {
  position: fixed;
  top:30px;
  a {
    display: inline-block;
    padding: 3px;
    :hover {
      background: rgba(0, 0, 0, 0.6);
    }
    img {
      height: 48px;
    }
  }
}
#runningApps {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
}
</style>
