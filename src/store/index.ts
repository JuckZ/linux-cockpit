import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import desktop from '@/platform/apps/Desktop/store/'
import menu from '@/platform/apps/Menu/store/'
import login from '@/platform/apps/Login/store/'
Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  strict: true,
  state: state,
  mutations,
  actions,
  modules: {
    desktop: desktop.store,
    menu: menu.store,
    login: login.store,
  },
})
