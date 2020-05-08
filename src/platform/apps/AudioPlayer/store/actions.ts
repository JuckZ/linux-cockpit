/*
 * @Author: Juck
 * @Date: 2020-05-08 23:35:35
 * @LastEditTime: 2020-05-09 00:01:17
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AudioPlayer\store\actions.ts
 * @Juck is coding...
 */
export default {
    addAudios: (context: any, payload: any) => {
        context.commit('addAudios', payload)
    },
}
