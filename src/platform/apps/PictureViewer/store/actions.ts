/*
 * @Author: Juck
 * @Date: 2020-05-05 21:49:40
 * @LastEditTime: 2020-05-06 20:23:12
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\PictureViewer\store\actions.ts
 * @Juck is coding...
 */
export default {
    setCurrentPictureSrc: ( context: any, payload: any) => {
        context.commit('setCurrentPictureSrc', payload)
      },
      addPictures: ( context: any, payload: any) => {
        context.commit('addPictures', payload)
      },
}
