/*
 * @Author: Juck
 * @Date: 2020-05-07 11:00:05
 * @LastEditTime: 2020-05-07 14:47:40
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\UserManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setUsers: ( state: any, payload: any) => {
    state.users = payload.options.users
  },
  addUser: ( state: any, payload: any) => {
    state.users.push(payload.options.user)
  },
  deleteUser: (state: any, payload: any) => {
    state.users = state.users.filter((user: any) => {
      // 是否需要加入id的判断
      return user.user != payload.options.user.user
    })
  }
}
