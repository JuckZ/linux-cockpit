/*
 * @Author: Juck
 * @Date: 2020-04-30 08:14:04
 * @LastEditTime: 2020-05-09 21:36:34
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Notification\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  addNotification: (state: any, payload: any) => {
    state.notifications.push(payload.options.notification)
  },
  removeNotification: (state: any, payload: any) => {
    state.notifications.filter((notification: any) => {
      return notification.id == payload.options.notification.id
    })
  },
}
