/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-27 22:53:51
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setHomeFiles: (state: any, payload: any) => {
    state.homeFiles = payload
  },
  setCurrentDir: (state: any, payload: any) => {
    state.currentDir = payload
  }
}
