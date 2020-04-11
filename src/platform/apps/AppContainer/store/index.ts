/*
 * @Author: your name
 * @Date: 2020-04-04 19:01:09
 * @LastEditTime: 2020-04-11 15:13:06
 * @LastEditors: Juck
 * @Description: In User Settings Edit
 * @FilePath: \linux-cockpit\src\platform\apps\AppContainer\store\index.ts
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  moduleName: 'AppContainer',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
