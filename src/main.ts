/*
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-05-01 11:48:57
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
  Table,
  Layout,
  Menu,
  Breadcrumb,
  Tabs,
  Tag,
  Modal,
  Drawer,
  Spin,
  Divider
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
Vue.component('a-layout', Layout)
Vue.component('a-layout-header', Layout.Header)
Vue.component('a-layout-content', Layout.Content)
Vue.component('a-layout-sider', Layout.Sider)
Vue.component('a-layout-footer', Layout.Footer)
Vue.component('a-breadcrumb', Breadcrumb)
Vue.component('a-breadcrumb-item', Breadcrumb.Item)
Vue.component('a-menu', Menu)
Vue.component('a-menu-item', Menu.Item)
Vue.component('a-sub-menu', Menu.SubMenu)
Vue.component('a-tabs', Tabs)
Vue.component('a-tab-pane', Tabs.TabPane)
Vue.component('a-input-search', Input.Search)
Vue.component('a-tag', Tag)
Vue.component('a-modal', Modal)
Vue.component('a-drawer', Drawer)
Vue.component('a-spin', Spin)
Vue.component('a-divider', Divider)

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

// TAG实现拖拽移动位置和修改大小的功能的指令
Vue.directive('drag', function (el, binding) {
  //如果为编辑状态
  if (binding.value || binding.value === undefined) {
    //定义该元素的 top left width height
    let x: string, y: string, w: string, h: string;
    //鼠标的起始和结束坐标
    let cxStart: number, cyStart: number, cxEnd, cyEnd;
    //判断鼠标样式
    el.onmousemove = e => {
      //获取鼠标当前位置
      const cxNow = e.clientX;
      const cyNow = e.clientY;
      //获取div右下角相对浏览器的位置
      const {
        top: elTop,
        left: elLeft,
        width: elWidth,
        height: elHeight
      } = el.getBoundingClientRect();
      const elBottomHeight = elTop + elHeight;
      const elRightWidth = elLeft + elWidth;
      //判断鼠标是否在div下边界
      const mouseInBottom =
        cyNow <= elBottomHeight + 5 && cyNow >= elBottomHeight - 5;
      //判断鼠标是否在div右边界
      const mouseInRight =
        cxNow <= elRightWidth + 5 && cxNow >= elRightWidth - 5;
      if (mouseInBottom && mouseInRight) {
        el.style.cursor = 'se-resize';
      } else if (mouseInRight) {
        el.style.cursor = 'e-resize';
      } else if (mouseInBottom) {
        el.style.cursor = 's-resize';
      } else {
        el.style.cursor = 'move';
      }
    };
    el.onmousedown = e => {
      const mouse = el.style.cursor;
      //对象解构赋值
      const { left: elX, top: elY, width: elW, height: elH } = window.getComputedStyle(el);
      x = elX;
      y = elY;
      w = elW;
      h = elH;
      // console.log(x,y,w,h)
      cxStart = e.clientX;
      cyStart = e.clientY;
      //绑定移动事件
      /**
       * 操作DOM位置和大小方法
       * @param direct 方向
       * @param pos 尺寸/坐标
       * @param move 拖动距离
       * @param limit 限定范围
       */
      function handleDiv(direct: string | any[], pos: any[], move: number[], limit: number) {
        for (let i = 0; i < direct.length; i++) {
          let val = parseInt(pos[i]) + move[i];
          val = val <= limit ? limit : val;
          el.style[direct[i]] = val + 'px';
        }
      }
      document.onmousemove = e => {
        cxEnd = e.clientX;
        cyEnd = e.clientY;
        //默认左下方向配置
        const xMove = cxEnd - cxStart;
        const yMove = cyEnd - cyStart;
        let direct = ['width', 'height'];
        let pos = [w, h];
        let move = [xMove, yMove];
        let limit = 50;
        //判断鼠标的类型进行对应的操作
        switch (mouse) {
          case 'e-resize':
            direct = ['width'];
            pos = [w];
            move = [xMove];
            break;
          case 's-resize':
            direct = ['height'];
            pos = [h];
            move = [yMove];
            break;
          case 'move':
            direct = ['left', 'top'];
            pos = [x, y];
            limit = 0;
            break;
        }
        handleDiv(direct, pos, move, limit);
      };
      //取消移动事件
      document.onmouseup = e => {
        document.onmousemove = null;
      };
    };
  } else {
    el.style.cursor = 'default';
    //移除点击事件
    el.onmousedown = null;
    el.onmousemove = null;
  }
})

// TAG 拖拽指令 (暂未使用，可以用来学习)
Vue.directive('drag2', function (el) {
  el.onmousedown = function (e) {
    //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
    const disX = e.clientX - el.offsetLeft;
    const disY = e.clientY - el.offsetTop;
    console.log(disX, disY);

    //包含在onmousedown里面，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove，点击后再移动
    //使用document.onmousemove，不要使用el.onmousemmove
    //在这个文档里出不去
    document.onmousemove = function (e) {
      //获取移动后div的位置：鼠标位置-disX/disY
      const l = e.clientX - disX;
      const t = e.clientY - disY;
      el.style.left = l + 'px';      //必须要有单位
      el.style.top = t + 'px';
    }
    //停止移动，鼠标弹起
    document.onmouseup = function (e) {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
});