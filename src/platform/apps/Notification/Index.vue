<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-30 08:39:42
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Notification\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="notification">
    <a @click="showDrawer">
      <a-icon type="notification" />
    </a>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :afterVisibleChange="afterVisibleChange"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<style lang="scss" scoped>
  #notification {
    a {
      display: inline-block;
      height: 40px;
      position: fixed;
      bottom: 0;
      right: 0;
      // 设置通知按钮的图标大小
      i {
        font-size: 30px;
      }
    }
  }
</style>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
