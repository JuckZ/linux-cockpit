/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-10 10:50:28
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\index.ts
 * @Juck is coding...
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  moduleName: 'Config',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
