<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-11 17:28:57
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AppContainer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div class="appContainer" v-show="show" id="appContainer">
    <div class="appTitleBar">
      <a-icon type="minus" />
      <a-icon type="fullscreen" />
      <!-- 恢复到全屏之前 -->
      <!-- <a-icon type="fullscreen-exit" /> -->
      <a-icon type="close" />
    </div>
  <!-- slot用于防止app的真正内容 -->
  <slot/>
  </div>
</template>
<style lang="scss">
#appContainer {
  border-radius: 6px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 6px 6px;
  width: 800px;
  height: 400px;
  min-width: 300px;
  background: rgba(255, 255, 255, .8);
  .appTitleBar {
    text-align: end;
    padding-bottom: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, .8);
    // a-icon的样式
  i {
    font-size: 30px;
    color: #08c;
    :hover {
      cursor: pointer;
      background: rgba($color: #000000, $alpha: .5);
    }
  }
  }
}
</style>
<script>
export default {
  data() {
    return {
      // 
    }
  },
  computed:{
    show: () => {
      return true
    }
  },
  method: {
    setShow() {
if(this.$route.path === '/') {
      this.show = false
    } else {
      this.show = true
    }
    }
  }
}
</script>
