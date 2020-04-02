export default {
  // 是否显示菜单
  show: 'none',
  // 菜单左侧 - 应用
  apps: [
    { id: 1, name: '今日天气', path: '' },
    { id: 2, name: 'iClock', path: '' },
  ],
  // 用户头像等信息
  avatar: {
    username: 'juck',
    usergroup: 'root',
    avatarSrc: 'https://cn.vuejs.org/images/logo.png',
  },
  // 菜单右侧 - 其他信息
  otherInfo: [
    { id: 1, name: 'admin', path: '' },
    { id: 2, name: '个人中心', path: '' },
    { id: 3, name: '我的应用', path: '' },
    { id: 4, name: '系统设置', path: '' },
    { id: 5, name: 'GitHub', path: '' },
  ],
}
