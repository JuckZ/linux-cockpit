/*
 * @Author: Juck
 * @Date: 2020-04-02 11:56:42
 * @LastEditTime: 2020-04-10 11:42:26
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Menu\store\state.ts
 * @Juck is coding...
 */
export default {
  // 是否显示菜单
  show: 'none',
  // 菜单左侧 - 应用
  apps: [
    {
      id: 1,
      name: '应用市场',
      imgSrc: '/assets/apps/ApplicationMarket/logo.png',
    },
    {
      id: 2,
      name: '个人中心',
      imgSrc: '/assets/apps/PersonalCenter/logo.png',
    },
    {
      id: 3,
      name: '系统设置',
      imgSrc: '/assets/apps/SystemSettings/logo.png',
    },
    {
      id: 4,
      name: '今日天气',
      imgSrc: '/assets/apps/Weather/logo.png',
    },
    {
      id: 5,
      name: '微信',
      imgSrc: '/assets/apps/weChat/logo.png',
    },
    {
      id: 6,
      name: 'iClock',
      imgSrc: '/assets/apps/iClock/logo.png',
    },
    {
      id: 7,
      name: '高德地图',
      imgSrc: '/assets/apps/Amap/logo.png',
    },
  ],
  // 用户头像等信息
  avatar: {
    username: 'juck',
    usergroup: 'root',
    avatarSrc: '/assets/win7/avatar.png',
  },
  // 菜单右侧 - 其他信息
  otherInfo: [
    { id: 1, name: 'admin', path: '' },
    { id: 2, name: '个人中心', path: '' },
    { id: 3, name: '我的应用', path: '' },
    { id: 4, name: '系统设置', path: '' },
    { id: 5, name: 'GitHub', path: '' },
  ],
  // appInfo
  appInfo: {
    Name: 'linux-cockpit',
    Author: 'Juck',
    Version: '0.0.1',
    SourceCode: 'https://github.com/JuckZ/linux-cockpit',
  },
}
