/*
 * @Author: Juck
 * @Date: 2020-04-02 11:56:42
 * @LastEditTime: 2020-04-30 08:07:35
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Menu\store\mutations.ts
 * @Juck is coding...
 */
export default {
  // 修改show的值
  toggleMenu: (state: any) => {
    // console.log(payload)
    if (state.show == 'block') state.show = 'none'
    else state.show = 'block'
    // state.show = !state.show
  },
  // 关闭菜单
  closeMenu: (state: any) => {
    if (state.show == 'block') state.show = 'none'
  }
}
