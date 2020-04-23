<template>
  <div :style="`display:${show}`" id="menu" ref="menu">
    <a id="avatar" ref="avatar">
      <img :src="avatar.avatarSrc" />
    </a>
    <!-- 左侧菜单 app列表 -->
    <ul id="appList" ref="appList">
      <li v-for="item in apps" v-show="item.inStartMenu" :key="item.id">
        <a @click="targetHandler($event, {type: 'running', app: item})">
          <img :src="item.imgSrc" /><span>{{ item.name }}</span>
        </a>
      </li>
    </ul>
    <!-- 菜单右侧选项卡 -->
    <ul id="otherInfoList" ref="otherInfoList">
      <li v-for="item in otherInfo" :key="item.id">
        <a>
          {{ item.name }}
        </a>
      </li>
    </ul>
    <!-- 菜单右侧底部 应用信息 -->
    <div id="appInfo" ref="appInfo">
      <div>Name: {{ appInfo.Name }}</div>
      <div>Author: {{ appInfo.Author }}</div>
      <div>Version: {{ appInfo.Version }}</div>
      <!-- <div>SourceCode: {{ appInfo.SourceCode }}</div> -->
    </div>
    <!-- 按钮，用于关机、重启等 -->
    <ul id="btnGroup" ref="btnGroup">
      <li v-for="item in btnGroup" :key="item.id">
        <a @click="btnTargetHandler($event, item.target)">
          <a-icon style="color: rgba(0,0,0,1);" :type="item.type" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      publicPath: process.env,
      btnGroup: [
        {
          id: 0,
          type: 'poweroff',
          target: 'poweroff',
        },
        {
          id: 1,
          type: 'login',
          target: 'login',
        },
        {
          id: 2,
          type: 'logout',
          target: 'logout',
        },
      ],
      //
    }
  },
  computed: {
    ...mapState('menu', {
      show: 'show'
    }),
    ...mapState('config', {
      apps: 'apps',
      otherInfo: 'otherInfo',
      appInfo: 'appInfo',
      avatar: 'avatar',
    })
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions({
      // 修改app运行状态
      setAppStatus: 'config/setAppStatus'
    }),
    targetHandler(e, payload) {
      // TAG此处如果直接打印payload也是不行的，因为展开对象的时候payload对象已经被修改了
      // 应该打印JSON.parse(JSON.stringify(payload))
      this.setAppStatus(payload)
    },
    btnTargetHandler(e, target) {
      switch(target) {
        case 'poweroff':
          // uploadCommand(target)
          break
        case 'login':
          // this.apps[10]指的是login模块app
          this.setAppStatus({type: 'running', app: this.apps[10]})
          break
        
      }
      alert(target)
    },
  },
}
</script>

<style lang="scss">
* {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
#menu {
  bottom: 40px;
  position: fixed;
  width: 400px;
  height: 80vh;
  background-color: rgba(255, 255, 255, 0.2);
}
#avatar {
  display: inline-block;
  height: 60px;
  width: 60px;
  position: relative;
  left: 270px;
  top: -30px;
  img {
    height: 60px;
  }
}

#appList {
  margin: 6px 0px 6px 6px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, 0.6);
  width: 200px;
  height: 96%;
  li {
    padding: 4px 0px;
    a {
      display: block;
      height: 36px;
      color: black;
      padding-left: 20px;
      img {
        height: 36px;
      }
      span {
        margin-left: 8px;
      }
    }
    a:hover {
      background-color: white;
      border-left: 3px solid blue;
    }
  }
}
#otherInfoList {
  position: relative;
  top: 20px;
  left: 240px;
  width: 120px;
  a {
    color: white;
    display: inline-block;
    width: 100%;
    height: 40px;
    text-align: center;
  }
}
#appInfo {
  position: fixed;
  bottom: 150px;
  left: 240px;
  font-size: 14px;
  color: white;
  div {
    padding: 5px;
  }
}
#btnGroup {
  position: fixed;
  bottom: 45px;
  left: 230px;
  li {
    display: inline-block;
    margin: 0px 5px;
    height: 40px;
    width: 40px;
    a {
      i {
        font-size: 40px;
      }
    }
  }
}
</style>
