<!--
 * @Author: Juck
 * @Date: 2020-04-12 09:39:39
 * @LastEditTime: 2020-04-16 14:59:29
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\RunningAppsLayer\Index.vue
 * @Juck is coding...
 -->
<template>
  <ul id="runningAppsLayer">
    <li v-for="app in apps" v-show="app.status.running" :key="app.id">
      {{app.name}}
      <AppContainer :style="`left:${app.status.position.x}px;top:${app.status.position.y}px;width:${app.status.position.width}px;height:${app.status.position.height}px`" :id="`${app.name}${app.id}`">
        <!-- <my-notFound></my-notFound> -->
        <!-- 动态添加app -->
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
      newApps: ''
    }
  },
  name: 'runningAppsLayer',
  components: {
    AppContainer
  },
  computed: {
    ...mapState('config', {
      apps: 'apps'
    })
  },
  mounted(){
  // 
  BUS.$on('SetAppStatus', (res) => {
    // console.info(res)
  })
  },
  methods: {
    ...mapActions({
      // 修改app运行状态
      setAppStatus: 'config/setAppStatus'
    }),
  }
}
</script>