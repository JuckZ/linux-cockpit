/*
 * @Author: your name
 * @Date: 2020-04-04 19:01:09
 * @LastEditTime: 2020-04-22 11:33:41
 * @LastEditors: Juck
 * @Description: In User Settings Edit
 * @FilePath: \linux-cockpit\src\platform\apps\AppStore\store\index.ts
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  moduleName: 'AppStore',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
