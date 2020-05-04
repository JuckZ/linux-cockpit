/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-04 01:14:48
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\actions.ts
 * @Juck is coding...
 */
export default {
    addTab: (context: any, payload: any) => {
        context.commit('addTab',payload)
    },
    initTab: (context: any, payload: any) => {
        context.commit('initTab',payload)
    },
    setTab: (context: any, payload: any) => {
        context.commit('setTab',payload)
    },
}
