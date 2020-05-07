/*
 * @Author: your name
 * @Date: 2020-04-04 19:01:09
 * @LastEditTime: 2020-05-07 11:19:36
 * @LastEditors: Juck
 * @Description: In User Settings Edit
 * @FilePath: \linux-cockpit\src\platform\apps\SystemInformation\store\index.ts
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default {
  moduleName: 'SystemInformation',
  store: {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  },
}
