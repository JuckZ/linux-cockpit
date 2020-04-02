<template>
  <div id="taskbar" ref="taskbar">
    <div id="startMenu">
      <a @click="toggleMenu" href="javascript:void(0)">
        <img src="../../../assets/win7/win.svg" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggleMenu() {
      // 弹出或者收起开始菜单
      this.show = !this.show
      this.$parent.$parent.$emit('toggleMenuEvent', this.show)
      console.log(this.show)
    },
  },
}
</script>

<style lang="scss">
#taskbar {
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  //   filter: blur(5px);
  #startMenu {
    a {
      display: inline-block;
      img {
        height: 40px;
      }
    }
    a:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
