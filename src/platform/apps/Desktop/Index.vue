<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-10 16:54:10
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
    <h1 class="animated infinite bounce delay-2s">Example</h1>

    <div id="desktopIcons">
      <ul>
        <li v-for="app in apps" :key="app.id">
          <a @click="targetHandler($event, app.target)"><img :src="app.imgSrc" :alt="app.name"></a>
        </li>
      </ul>
    </div>
    <!-- 任务栏模块 -->
    <TaskBar />
    <!-- 徽标菜单 -->
    <Menu />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Wallpaper from '@/platform/apps/Wallpaper/Index.vue'
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
    TaskBar,
    Menu,
  },
  computed:{
    ...mapState('config',{
      apps: 'apps'
    })
  },
  mounted() {
    //
    console.log(process.env.NODE_ENV)
  },
  methods: {
    targetHandler(e, target) {
      if (this.$route.path !== target) this.$router.push(target)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
#desktopIcons {
  a {
    img {
      height: 48px;
    }
  }
}
</style>
