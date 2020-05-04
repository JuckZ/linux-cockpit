/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-04 14:44:31
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //初始化tab（即第一个tab）
  initTab: (state: any, payload: any) => {
    state.tabs = [payload.options.tab]
  },
  // 添加tab
  addTab: (state: any, payload: any) => {
    state.tabs.push(payload.options.tab)
  },
  // 设置tab
  setTab: (state: any, payload: any) => {
    // state.tabs[payload.options.tabID] = payload.options.tab
    // FIXME为了能够动态修改视图，必须通过下面的方式才能让vue监听到数据变化
    state.tabs[payload.options.tabID].files = payload.options.tab.files
    state.tabs[payload.options.tabID].totalSize = payload.options.tab.totalSize
    state.tabs[payload.options.tabID].currentDir = payload.options.tab.currentDir
  },
}