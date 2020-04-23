<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-23 11:18:29
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AppContainer\Index.vue
 * @Juck is coding...
 -->
<template>
  <VueDragResize
    :isActive="true"
    :isDraggable="true"
    :isResizable="true"
    :class="{ fullscreen: currentApp.status.window == 'fullscreen'}"
    :x="currentApp.status.position.x"
    :y="currentApp.status.position.y"
    :w="currentApp.status.position.width"
    :h="currentApp.status.position.height"
  >
    <div class="appContainer">
      <div class="appTitleBar">
        <span>
          <!-- 标题文字 -->
          <slot name="titleText" />
        </span>
      </div>
      <!-- app组件本身 -->
      <!-- <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p> -->
      <div class="appContent">
        <slot name="appComponent" />
      </div>
    </div>
  </VueDragResize>
</template>
<style lang="scss">
.fullscreen {
  position: fixed;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.appContainer {
  height: 100%;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  .appTitleBar {
    width: 100%;
    text-align: end;
    position: absolute;
    z-index: 99;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
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
    padding-top: 24px;
  }

}
  
</style>
<script>
import VueDragResize from 'vue-drag-resize'
export default {
  name: 'appContainer',
  components: {
    VueDragResize,
  },
  props: ['currentApp'],
  data() {
    return {
      //
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }
  },
  computed: {},
  method: {
    onResizing() {
      console.log('resize')

      // this.width = newRect.width;
      // this.height = newRect.height;
      // this.top = newRect.top;
      // this.left = newRect.left;
    },
  },
}
</script>
