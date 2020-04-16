/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-16 11:17:08
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
