import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Form, Input, Icon, Checkbox, ConfigProvider } from 'ant-design-vue';

Vue.use(VueApollo)
Vue.use(VueAxios, axios)
Vue.use( Button, Form, Input, Icon, Form, Checkbox, ConfigProvider )
Vue.component("a-input",Input)
Vue.component("a-icon",Icon)
Vue.component("a-button",Button)
Vue.component("a-form",Form)
Vue.component("a-form-item",Form.Item)
Vue.component("a-checkbox",Checkbox)
Vue.component("a-config-provider",ConfigProvider)
Vue.config.productionTip = false

// 产生apollo客户端实例对象
const apolloClient = new ApolloClient({
  uri: 'http://localhost:80/graphql'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
