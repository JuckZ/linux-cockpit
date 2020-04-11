<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-11 20:25:56
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
        <li v-for="app in apps" v-show="app.inDesktop" :key="app.id">
          <a @dblclick="targetHandler($event, app)"
            ><img :src="app.imgSrc" :alt="app.name"
          /></a>
        </li>
      </ul>
    </div>
    <!-- 状态栏 -->
    <StatusBar />
    <!-- 任务栏模块 -->
    <TaskBar>
      <ul>
        <li v-for="item in runningApps" :key="item.key">
          <a>
            <img :src="item.imgSrc" :alt="item.name">
          </a>
        </li>
      </ul>
    </TaskBar>
    <!-- 徽标菜单 -->
    <Menu />
    <!-- 遮罩层，用于放置运行中的程序 -->
    <ul class="runningApps">
      <li v-for="item in runningApps" :key="item.key">
        <AppContainer>
          <!-- <my-notFound></my-notFound> -->
          <!-- 动态添加app -->
        </AppContainer>
      </li>
    </ul>
  </div>
</template>

<script>
import Wallpaper from '@/platform/apps/Wallpaper/Index.vue'
import StatusBar from '@/platform/apps/StatusBar/Index.vue'
import TaskBar from '@/platform/apps/TaskBar/Index.vue'
import Menu from '@/platform/apps/Menu/Index.vue'
import AppContainer from '@/platform/apps/AppContainer/Index.vue'
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
    AppContainer,
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
#desktopIcons {
  position: fixed;
  top: 30px;
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
.runningApps {
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
