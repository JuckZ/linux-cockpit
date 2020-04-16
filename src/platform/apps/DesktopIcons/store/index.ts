/*
 * @Author: Juck
 * @Date: 2020-04-11 20:33:29
 * @LastEditTime: 2020-04-11 20:34:20
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\DesktopIcons\store\index.ts
 * @Juck is coding...
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  moduleName: 'DesktopIcons',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
