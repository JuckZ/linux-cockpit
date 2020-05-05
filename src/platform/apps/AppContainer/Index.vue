<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-05 23:00:32
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AppContainer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div
    v-drag
    :class="{
      appContainer: true,
      isFocused: currentApp.status.focus == true,
      fullscreen: currentApp.status.window == 'fullscreen',
      minimize: currentApp.status.window == 'minimize',
    }"
    :style="{
      'left': currentApp.positionWithUnit.left,
      'top': currentApp.positionWithUnit.top,
      width: currentApp.positionWithUnit.width,
      height: currentApp.positionWithUnit.height
    }"
    @mousedown="setAppStatusFocus({
      app: currentApp
    })"
    @mouseup.left="setAppStatusPosition({
      app: currentApp,
      options: {
        position: {
          top: $event.currentTarget.style.top.split(/px/)[0],
          left: $event.currentTarget.style.left.split(/px/)[0],
          width: $event.currentTarget.style.width.split(/px/)[0],
          height: $event.currentTarget.style.height.split(/px/)[0]
        }
      }
    })"
  >
    <div class="appTitleBar">
      <span>
        <!-- 标题文字 -->
        <slot name="titleText" />
      </span>
    </div>
    <!-- app组件本身 -->
    <div class="appContent">
      <slot :currentApp='currentApp' name="appComponent" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fullscreen {
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.minimize {
  display: none;
}
.isFocused {
  z-index: 999;
  background: rgba(255, 255, 255, 0.9)!important;
}
.appContainer {
  position: fixed;
  border-radius: 6px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.7);
  .appTitleBar {
    width: 100%;
    text-align: end;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
    // TAG
    height: 28px;
    // a-icon的样式
    img {
      height: 20px;
      color: blue;
      :hover {
        cursor: pointer;
        background: rgba($color: #000000, $alpha: 0.5);
      }
    }
  }
  .appContent {
    // padding: 0px;
  }
}

</style>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'appContainer',
  components: {},
  props: ['currentApp'],
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
    }),
  },
  methods: {
    ...mapActions({
      toggleMenu: 'menu/toggleMenu',
      setAppDefault: 'config/setAppDefault',
      setAppStatusPosition: 'config/setAppStatusPosition',
      setAppStatusFocus: 'config/setAppStatusFocus',
      closeMenu: 'menu/closeMenu'
    }),
  }
}
</script>