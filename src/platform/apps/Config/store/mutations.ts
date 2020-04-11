/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-11 19:40:26
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\mutations.ts
 * @Juck is coding...
 */
export default {
    setAppStatus: ( state: any, payload: any ) => {
        state.apps[payload.id].status.running = true
    }
}
