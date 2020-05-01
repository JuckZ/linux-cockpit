/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-01 09:09:11
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setTab: (state: any, payload: any) => {
    state.tabs.push(payload.options.tab)
  },
  setHomeFiles: (state: any, payload: any) => {
    state.homeFiles = payload
  },
  setCurrentDir: (state: any, payload: any) => {
    state.currentDir = payload
  }
}
