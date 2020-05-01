<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-30 11:23:17
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Notification\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="notification">
    <a @click="showDrawer">
      <img src="/assets/apps/Notification/logo.png" alt="打开通知">
    </a>
    <a-drawer
      title="通知栏"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :afterVisibleChange="afterVisibleChange"
    >
      <p>启动成功！2020年4月30日 11：20</p>
      <p>登录成功！2020年4月30日 11：22</p>
    </a-drawer>
  </div>
</template>
<style lang="scss" scoped>
  #notification {
    a {
      display: inline-block;
      height: 20px;
      position: fixed;
      top: 0;
      right: 0;
      // 设置通知按钮的图标大小
      img {
        height: 20px;
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
