/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-16 15:02:57
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\mutations.ts
 * @Juck is coding...
 */
export default {
    setAppStatus: ( state: any, payload: any ) => {
        console.log(`调用了${++state.count}次`)
        console.log(state.apps[payload.id].status.running);
        state.apps[payload.id].status.running = 1
        console.log(state.apps[payload.id].status.running);
    }
}
