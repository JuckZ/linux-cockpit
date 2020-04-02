import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import desktop from '@/platform/apps/Desktop/store/'
import menu from '@/platform/apps/Menu/store/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations,
  actions,
  modules: {
    desktop: desktop.store,
    menu: menu.store,
  },
})
