/*
 * @Author: Juck
 * @Date: 2020-04-02 20:24:01
 * @LastEditTime: 2020-04-27 09:12:33
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Login\store\state.ts
 * @Juck is coding...
 */
export default {
  // 是否为登录状态
  isLogined: false,
  // 登录信息
  userInfo: {
    domainOrIP: 'juck.site',
    userName: 'root',
    password: 'Zc1998zc',
    remember: true,
    loginType: 'password',
  },
  // 上次登录时间
  lastLoginTime: '',
  // sockets信息
  /**
   * sockets: [
   *    {
   *      id: 1;
   *      socket: socket
   *    },
   * {...}
   * ]
   */
  // sockets: [],
  // socket信息
  socket: null,
  // socketStream信息
  stream: null
}
