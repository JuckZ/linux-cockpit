<!--
 * @Author: Juck
 * @Date: 2020-04-11 20:33:29
 * @LastEditTime: 2020-04-23 21:32:27
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\DesktopIcons\Index.vue
 * @Juck is coding...
 -->
<template>
  <ul id="desktopIcons">
    <!-- 如果app.inDesktop为true时才显示在桌面 -->
    <li v-for="app in apps" v-show="app.inDesktop" :key="app.id">
      <a
        @dblclick="
          runApp({
            app: app,
          })
        "
        ><img :src="app.imgSrc" :alt="app.name"
      /></a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
    }),
  },
  mounted() {
    //
    // this.test = require(this.avatar.avatarSrc)
  },
  methods: {
    ...mapActions({
      // 修改app运行状态
      setAppStatus: 'config/setAppStatus',
      runApp: 'config/runApp',
    }),
  },
}
</script>

<style lang="scss">
* {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
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
</style>
