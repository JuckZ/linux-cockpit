<!--
 * @Author: Juck
 * @Date: 2020-04-01 21:28:32
 * @LastEditTime: 2020-04-11 17:17:26
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\TaskBar\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="taskbar" ref="taskbar">
    <div id="startMenu">
      <a @click="toggleMenu">
        <img src="/assets/win7/win.svg" />
      </a>
    </div>
    <div id="tasks">
      <slot/>
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
    display: inline-block;
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
  #tasks {
    display: inline-block;
    a {
      display: inline-block;
      background: rgba(255, 255, 255, 0.4);
      img {
        height: 40px;
      }
    }
  }
}
</style>
