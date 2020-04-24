<!--
 * @Author: Juck
 * @Date: 2020-04-12 09:39:39
 * @LastEditTime: 2020-04-23 21:32:20
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\RunningAppsLayer\Index.vue
 * @Juck is coding...
 -->
<template>
  <ul id="runningAppsLayer">
    <li
      v-for="app in runningApps"
      :id="`${app.name}${app.id}`"
      v-show="app.status.running"
      :key="app.id"
    >
      <AppContainer :currentApp="app">
        <!-- app真正的内容 -->
        <!-- app标题栏 -->
        <template v-slot:titleText>
          <!-- app标题 -->
          <span>{{ app.name }}</span>
          <!-- FIXME: 点击窗口按钮时可能触发点击事件的target不是预期的 -->
          <!-- 窗口按钮 -->
          <a
            @click="
              setAppMinimize({
                options: {},
                app: app,
              })
            "
          >
            <img
              btnType="minimize"
              src="/assets/apps/AppContainer/minimize.svg"
              alt="最小化"
            />
          </a>
          <a
            @click="
              setAppFullscreen({
                options: {},
                app: app,
              })
            "
            ><img
              btnType="fullscreen"
              v-show="app.status.window !== 'fullscreen'"
              src="/assets/apps/AppContainer/fullscreen.svg"
              alt="全屏"
          /></a>
          <a
            @click="
              setAppDefault({
                options: {},
                app: app,
              })
            "
            ><img
              btnType="default"
              v-show="app.status.window == 'fullscreen'"
              src="/assets/apps/AppContainer/default.svg"
              alt="退出全屏"
          /></a>
          <a
            @click="
              shutdownApp({
                options: {},
                app: app,
              })
            "
            ><img
              btnType="close"
              src="/assets/apps/AppContainer/close.svg"
              alt="关闭"
          /></a>
        </template>
        <!-- app组件 -->
        <template v-slot:appComponent>
          <component :is="app.componentName"></component>
        </template>
      </AppContainer>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
#runningAppsLayer {
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

<script>
import BUS from '@/platform/bus'
import { mapState, mapActions } from 'vuex'
import AppContainer from '@/platform/apps/AppContainer/Index.vue'
export default {
  data() {
    return {
      oldApps: this.apps,
      newApps: '',
    }
  },
  name: 'runningAppsLayer',
  components: {
    AppContainer,
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
    }),
    runningApps: function() {
      return this.apps.filter((app) => {
        return app.status.running
      })
    },
  },
  mounted() {
    // 监听setAppStatus事件
    BUS.$on('setAppStatus', (res) => {
      console.info(res)
    })
  },
  methods: {
    ...mapActions({
      // 修改app运行状态
      setAppStatus: 'config/setAppStatus',
      setAppFullscreen: 'config/setAppFullscreen',
      setAppMinimize: 'config/setAppMinimize',
      setAppDefault: 'config/setAppDefault',
      shutdownApp: 'config/shutdownApp',
    }),
    handleSetWindow(event, payload) {
      // 获取按钮的type值
      // const btnType = event.target.attributes[2].nodeValue;
      const btnType = event.target.attributes.btnType.value
      this.setAppStatus({
        btnType,
        ...payload,
      })
    },
  },
}
</script>
