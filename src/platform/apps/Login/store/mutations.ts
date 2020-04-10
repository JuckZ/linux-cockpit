/*
 * @Author: Juck
 * @Date: 2020-04-02 20:24:01
 * @LastEditTime: 2020-04-07 11:33:36
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Login\store\mutations.ts
 * @Juck is coding...
 */
export default {
  // 修改登录状态
  setIsLogined: (state: any, res: any) => {
    if (res.data.login.code === 200) {
      state.isLogined = true
      
    } else {
      state.isLogined = false
      
    }
  },
  // 修改socket的值
  setSocket: (state: any, socket: any) => {
    if (state.isLogined) {
      state.socket = socket
    } else {
      state.socket = null
    }
  },
  // 修改登录方式
  setUserInfoLoginType: (state: any) => {
    if (state.userInfo.loginType == 'password') {
      state.userInfo.loginType = 'privateKey'
    } else {
      state.userInfo.loginType = 'password'
    }
  },
}
