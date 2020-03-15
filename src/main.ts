import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Form, Input, Icon, Checkbox, ConfigProvider } from 'ant-design-vue';

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
