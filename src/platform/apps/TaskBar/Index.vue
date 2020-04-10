<template>
  <div id="taskbar" ref="taskbar">
    <div id="startMenu">
      <a @click="toggleMenu" href="javascript:void(0)">
        <img src="/assets/win7/win.svg" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
    }
  },
  created() {
    //
  },
  methods: {
    ...mapActions({
      toggleMenu: 'menu/toggleMenu',
    }),
  },
}
</script>

<style lang="scss">
#taskbar {
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 43px;
  background-color: rgba(255, 255, 255, 0.2);
  //   filter: blur(5px);
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
