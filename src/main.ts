/*
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-04-23 09:30:36
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\main.ts
 * @Juck is coding...
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自定义组件
import NotFound from '@/platform/apps/NotFound/Index.vue'
import Shell from '@/platform/apps/Shell/Index.vue'
import FileManager from '@/platform/apps/FileManager/Index.vue'
import TaskManager from '@/platform/apps/TaskManager/Index.vue'
import AppStore from '@/platform/apps/AppStore/Index.vue'
import PersonalCenter from '@/platform/apps/PersonalCenter/Index.vue'
import SystemSettings from '@/platform/apps/SystemSettings/Index.vue'
import Weather from '@/platform/apps/Weather/Index.vue'
import WeChat from '@/platform/apps/WeChat/Index.vue'
import IClock from '@/platform/apps/IClock/Index.vue'
import AMap from '@/platform/apps/AMap/Index.vue'
import Login from '@/platform/apps/Login/Index.vue'

// 导入antDesign组件
import {
  notification,
  message,
  Button,
  Form,
  Input,
  Icon,
  Checkbox,
  ConfigProvider,
  Select,
  Switch,
  Col,
  Row,
  Upload,
  Table
} from 'ant-design-vue'

Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.use(VueApollo)
Vue.use(VueAxios, axios)
// Vue.use(
//   Button,
//   Form,
//   Input,
//   Icon,
//   Form,
//   Checkbox,
//   ConfigProvider,
//   Select,
//   Switch,
//   Row,
//   Col,
//   Upload
// )

// 注册antD组件
Vue.component('a-input', Input)
Vue.component('a-icon', Icon)
Vue.component('a-button', Button)
Vue.component('a-form', Form)
Vue.component('a-form-item', Form.Item)
Vue.component('a-checkbox', Checkbox)
Vue.component('a-config-provider', ConfigProvider)
Vue.component('a-select', Select)
Vue.component('a-switch', Switch)
Vue.component('a-input-group', Input.Group)
Vue.component('a-row', Row)
Vue.component('a-col', Col)
Vue.component('a-upload', Upload)
Vue.component('a-table', Table)

// 注册自定义组件
Vue.component('NotFound', NotFound)
Vue.component('Shell', Shell)
Vue.component('FileManager', FileManager)
Vue.component('TaskManager', TaskManager)
Vue.component('AppStore', AppStore)
Vue.component('PersonalCenter', PersonalCenter)
Vue.component('SystemSettings', SystemSettings)
Vue.component('Weather', Weather)
Vue.component('WeChat', WeChat)
Vue.component('IClock', IClock)
Vue.component('AMap', AMap)
Vue.component('Login', Login)


Vue.config.productionTip = false
// 产生apollo客户端实例对象
const apolloClient = new ApolloClient({
  uri: 'http://localhost:80/graphql',
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
const myVue = new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
});
myVue.$mount('#app')

// TODO 挂载vue实例到window中，方便调试,需要删除
declare global {
  interface Window { myVue: any }
}
window.myVue = myVue
