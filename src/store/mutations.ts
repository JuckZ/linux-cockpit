export default {
  toggleLogin(state: any) {
    console.log('=================')
    console.log(state)
    // 切换登录状态
    state.isLogined = !state.isLogined
  },
  toggleShowMenu(state: any) {
    // 显示/收起开始菜单
    state.settings.showMenu = !state.settings.showMenu
  },
}
