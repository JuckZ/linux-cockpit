/*
 * @Author: Juck
 * @Date: 2020-05-08 23:40:40
 * @LastEditTime: 2020-05-09 00:02:38
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\VideoPlayer\store\actions.ts
 * @Juck is coding...
 */
export default {
    addVideos: (context: any, payload: any) => {
        context.commit('addVideos', payload)
    },
}
