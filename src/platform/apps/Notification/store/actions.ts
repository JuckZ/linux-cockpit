/*
 * @Author: Juck
 * @Date: 2020-04-30 08:14:04
 * @LastEditTime: 2020-05-09 21:36:58
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Notification\store\actions.ts
 * @Juck is coding...
 */
export default {
    addNotification: (context: any, payload: any) => {
        context.commit('addNotification', payload)
    },
    removeNotification: (context: any, payload: any) => {
        context.commit('removeNotification', payload)
    },
}
