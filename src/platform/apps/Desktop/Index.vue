<!--
 * @Author: Juck
 * @Date: 2020-04-01 12:13:29
 * @LastEditTime: 2020-04-26 09:08:51
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Desktop\Index.vue
 * @Juck is coding...
 -->
<template>
  <div id="desktop">
    <!-- 壁纸模块 -->
    <Wallpaper />
    <!-- 桌面快捷方式 -->
    <DesktopIcons />
    <!-- 状态栏 -->
    <StatusBar />
    <!-- 任务栏 展示当前运行中的任务 -->
    <TaskBar />
    <!-- 徽标菜单 -->
    <Menu />
    <!-- 遮罩层，用于放置运行中的程序 -->
    <RunningAppsLayer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 导入事件BUS
import BUS from '@/platform/bus'
// 导入桌面的小组件
import Wallpaper from '@/platform/apps/Wallpaper/Index.vue'
import StatusBar from '@/platform/apps/StatusBar/Index.vue'
import TaskBar from '@/platform/apps/TaskBar/Index.vue'
import Menu from '@/platform/apps/Menu/Index.vue'
import DesktopIcons from '@/platform/apps/DesktopIcons/Index.vue'
import RunningAppsLayer from '@/platform/apps/RunningAppsLayer/Index.vue'
export default {
  data() {
    return {}
  },
  name: 'desktop',
  components: {
    Wallpaper,
    StatusBar,
    TaskBar,
    RunningAppsLayer,
    Menu,
    DesktopIcons
  },
  computed: {
    ...mapState('login', {
      isLogined: 'isLogined',
      userInfo: 'userInfo',
      socket: 'socket'
    })
  },
  mounted() {
    // 监听isLogined，如果为true，则给socket绑定监听事件，控制销毁
    BUS.$on('socketInitialized', () => {
      console.log('socketInitialized');
      this.socket.on('disconnect', () => {        
      console.log('socket disconnect');
    });
    })
    
    // 每次刷新后vuex的值会清除掉，因此在这里将登录状态从sessionStorage中恢复到vuex中
    if(sessionStorage.getItem('isLogined')) {
      // this.restoreLogin(sessionStorage.getItem('userInfo'))
      const formData = JSON.parse(sessionStorage.getItem('userInfo'))
      this.login(formData).then(res => {
            // 提示登录结果
            this.openNotification(res.data.login)
            // 登录成功则跳转到首页，否则不作任何操作
            if (res.data.login.code === 200) {
              // 存储登录信息(isLogined,userInfo)
              sessionStorage.setItem('isLogined', true)
              // 隐藏login，并运行toRunApps中的app
              // 触发socketInitialized事件
              BUS.$emit('socketInitialized')
            }
          })
    }
    // console.log(process.env.NODE_ENV)
  },
  destroyed() {
    // FIXME似乎刷新触发得了destoryed但没有时间执行    
  },
  methods: {
    // 
    ...mapActions({
      login: 'login/login',
      restoreLogin: 'login/restoreLogin',
      changeLoginType: 'login/changeLoginType'
    }),
    openNotification(loginRes) {
      let message = ''
      let description = ''
      let icon = ''
      if (loginRes.code === 200) {
        message = '重新登录成功'
        description = `${loginRes.msg}`
        icon = <a-icon type="smile" style="color: #108ee9" />
      } else {
        message = '登录失败'
        description = `失败原因：${loginRes.msg}`
        icon = <a-icon type="exclamation-circle" style="color: red" />
      }
      this.$notification.open({
        message: message,
        description: description,
        icon: icon
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  height: 100vh;
}
</style>
