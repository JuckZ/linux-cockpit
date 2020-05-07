/*
 * @Author: Juck
 * @Date: 2020-05-07 11:00:05
 * @LastEditTime: 2020-05-07 14:12:53
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\UserManager\store\actions.ts
 * @Juck is coding...
 */
export default {
  setUsers: (context: any, payload: any) => {
    context.commit('setUsers', payload)
  },
  addUser: (context: any, payload: any) => {
    context.commit('addUser', payload)
  },
  deleteUser: (context: any, payload: any) => {
    context.commit('deleteUser', payload)
  }
}
