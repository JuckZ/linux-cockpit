/*
 * @Author: Juck
 * @Date: 2020-05-05 21:49:40
 * @LastEditTime: 2020-05-06 21:14:58
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\PictureViewer\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setCurrentPictureSrc: ( state: any, payload: any) => {
    state.currentPictureSrc = payload.options.currentPictureSrc
  },
  addPictures: ( state: any, payload: any) => {
    // 合并并去重
    state.pictures.push(...payload.options.pictures)
    state.pictures = Array.from(new Set(state.pictures))
  },

}
