/*
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-05-07 13:23:39
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\store\index.ts
 * @Juck is coding...
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'

import desktop from '@/platform/apps/Desktop/store/'
import menu from '@/platform/apps/Menu/store/'
import login from '@/platform/apps/Login/store/'
import wallpaper from '@/platform/apps/Wallpaper/store/'
import fileManager from '@/platform/apps/FileManager/store/'
import pictureViewer from '@/platform/apps/PictureViewer/store/'
import config from '@/platform/apps/Config/store/'
import userManager from '@/platform/apps/UserManager/store/'
import systemInformation from '@/platform/apps/SystemInformation/store/'
Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  strict: false,
  state: state,
  mutations,
  actions,
  modules: {
    desktop: desktop.store,
    menu: menu.store,
    login: login.store,
    wallpaper: wallpaper.store,
    fileManager: fileManager.store,
    config: config.store,
    pictureViewer: pictureViewer.store,
    userManager: userManager.store,
    systemInformation: systemInformation.store
  },
})
