export default {
  toggleMenu: (context: any) => {
    context.commit('toggleMenu')
  },
  // 关闭菜单
  closeMenu: (context: any) => {
    context.commit('closeMenu')
  }
}
