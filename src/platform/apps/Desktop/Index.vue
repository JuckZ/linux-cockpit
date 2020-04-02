<template>
  <div id="desktop">
    <Wallpaper msg1="1111" />
    <TaskBar />
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
  mounted() {
    //
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
</style>
