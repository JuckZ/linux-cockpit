/*
 * @Author: Juck
 * @Date: 2020-04-02 11:16:32
 * @LastEditTime: 2020-04-16 09:49:05
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\store\state.ts
 * @Juck is coding...
 */
export default {
  token: 'tok',
  isLogined: false,
  socket: null,
  settings: {
    // 壁纸链接
    wallpaperUrl: '',
    // 壁纸文件夹
    wallpaperFolder: '',
    // 是否为在线壁纸
    online: false,
    // 是否自动切换
    autoSwitch: false,
    // 壁纸持续时间
    duration: '3min',
    // 用户头像路径
    avatar: '@/assets/win7/avatar.svg',
    // 是否展示开始菜单
    showMenu: false,
  },
}
