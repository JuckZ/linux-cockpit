/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-01 09:09:56
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\actions.ts
 * @Juck is coding...
 */
export default {
    setTab: (context: any, payload: any) => {
        context.commit('setTab',payload)
    }
}
