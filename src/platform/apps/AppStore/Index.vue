<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-09 21:57:27
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AppStore\Index.vue
 * @Juck is coding...
 -->
<template>
  <div class="appStore">
    <a-divider>Linux软件</a-divider>
    <div class="linuxApps">
      <a-card class="appCard" hoverable>
        <template slot="actions" class="ant-card-actions">
          <a-icon key="download" type="download" />
          <a-icon key="close" type="close" />
          <a-icon key="info" type="info" />
        </template>
        <a-card-meta title="Linux软件" description="Linux软件">
          <a-avatar slot="avatar" src="/assets/apps/AppStore/linuxApp.svg" />
        </a-card-meta>
      </a-card>
      <a-card
        class="appCard"
        v-for="app in linuxApps"
        :key="app.item"
        hoverable
      >
        <template slot="actions" class="ant-card-actions">
          <a-icon
            key="download"
            type="download"
            @click="
              socket.emit('uploadScript', {
                target: 'appStore',
                options: {
                  operation: 'installSoftware',
                  app: app,
                },
              })
            "
          />
          <a-icon key="close" type="close" />
          <a-icon key="info" type="info" />
        </template>
        <a-card-meta :title="app.name" :description="`This is a local app`">
          <a-avatar slot="avatar" :src="app.imgSrc" />
        </a-card-meta>
      </a-card>
      <!-- 用于占位，保证最后一行布局的效果 -->
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <a-divider>本地插件</a-divider>
    <div class="localApps">
      <a-card class="appCard" hoverable>
        <template slot="actions" class="ant-card-actions">
          <a-icon key="download" type="download" />
          <a-icon key="close" type="close" />
          <a-icon key="info" type="info" />
        </template>
        <a-card-meta title="本地插件" description="本地插件">
          <a-avatar slot="avatar" src="/assets/apps/AppStore/localApp.svg" />
        </a-card-meta>
      </a-card>
      <a-card class="appCard" v-for="app in apps" :key="app.item" hoverable>
        <template slot="actions" class="ant-card-actions">
          <a-icon key="download" type="download" />
          <a-icon key="close" type="close" />
          <a-icon key="info" type="info" />
        </template>
        <a-card-meta :title="app.name" :description="`This is a local app`">
          <a-avatar slot="avatar" :src="app.imgSrc" />
        </a-card-meta>
      </a-card>
      <!-- 用于占位，保证最后一行布局的效果 -->
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState('config', {
      apps: 'apps',
      linuxApps: 'linuxApps',
    }),
    ...mapState('login', {
      socket: 'socket',
    }),
    ...mapState('notification', {
      notifications: 'notifications',
    }),
  },
  mounted() {
    this.socket.on('appStoreScriptRes', (payload) => {
      switch (payload.originPayload.options.operation) {
        case 'installSoftware': {
          const now = new Date()
          this.addNotification({
            options: {
              notification: {
                id: this.notifications.length,
                target: 'AppStore',
                text:
                  now.getHours() +
                  ':' +
                  now.getMinutes() +
                  '————' +
                  payload.res,
              },
            },
          })
          break
        }
      }
    })
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
    }),
  },
}
</script>

<style lang="less" scoped>
.appStore {
  position: relative;
  // TAG 此处使用100%则不能生成滚动条
  height: 100vh;
  overflow: scroll;
}
.localApps {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.linuxApps {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.localApps > i {
  width: 180px;
}
.linuxApps > i {
  width: 180px;
}
.appCard {
  height: 100%;
  width: 180px;
}
</style>
