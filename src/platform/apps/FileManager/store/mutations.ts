/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-01 16:43:19
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //初始化tab（即第一个tab）
  initTab: (state: any, payload: any) => {
    state.tabs[0] = payload.options.tab
  },
  // 添加tab
  addTab: (state: any, payload: any) => {
    state.tabs.push(payload.options.tab)
  },
}
