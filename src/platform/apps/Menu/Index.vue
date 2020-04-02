<template>
  <div id="menu" ref="menu">
    <!-- <a @click="toggleMenu" href="javascript:void(0)">
        <img src="../../../assets/win7/win.svg" />
      </a> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   show: false,
    }
  },
  computed: {
    show() {
      console.log('computed')

      return this.$store.state.showMenu
    },
  },
  watch: {
    show: function(val) {
      console.log('watched')

      this.toggleMenu(val)
    },
  },
  mounted() {
    // 添加事件监听，并初始化显示状态
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const self = this
    // this.$parent.$parent.$on('toggleMenuEvent', function(val) {
    //   self.toggleMenu(val)
    // })
    // self.toggleMenu(self.show)
  },
  methods: {
    toggleMenu(show) {
      if (show) {
        this.$refs.menu.style.display = 'block'
      } else {
        this.$refs.menu.style.display = 'none'
      }
    },
  },
}
</script>

<style lang="scss">
#menu {
  bottom: 40px;
  position: fixed;
  width: 400px;
  height: 80vh;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
