export default {
  state: {
    token: '',
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
  },
}
