<!--
 * @Author: Juck
 * @Date: 2020-04-01 21:28:32
 * @LastEditTime: 2020-04-26 10:37:11
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
      <!-- 如果app.status.running为true则显示在任务栏中 -->
      <ul>
        <li v-for="app in apps" v-show="app.status.running" :key="app.id">
          <a :class="{focusIcon: app.status.focus}">
            <img :btnType="app.status.window == 'minimize'?'default':'minimize'" @click="
            setAppDefault({
              app: app
            })
            " :src="app.imgSrc" :alt="app.name">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
    }
  },
  created() {
    //
  },
  computed: {
    ...mapState('config', {
      apps: 'apps'
    })
  },
  methods: {
    ...mapActions({
      toggleMenu: 'menu/toggleMenu',
      setAppDefault: 'config/setAppDefault',
    })
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
    width: 40px;
    a {
      display: inline-block;
      img {
        height: 40px;
      }
    }
    a:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    a.focusIcon {
      background: rgba(255, 255, 255, 0.4);
    }
  }
  #tasks {
    display: inline-block;
    li {
      display: inline-block;
      a {
        display: inline-block;
        :hover {
          background: rgba(255, 255, 255, 0.4);
        }
        img {
          height: 40px;
        }
      }
    }

  }
}
</style>
