<!--
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-04-28 10:52:47
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\App.vue
 * @Juck is coding...
 -->
<template>
  <div id="app">
    <!-- 配置模块，不可见 -->
    <Config />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss"></style>

<script>
import Config from '@/platform/apps/Config/Index.vue'
export default {
  components: {
    Config
  }
}
</script>