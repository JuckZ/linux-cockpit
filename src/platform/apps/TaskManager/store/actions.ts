/*
 * @Author: Juck
 * @Date: 2020-04-10 16:57:46
 * @LastEditTime: 2020-05-08 13:36:18
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\TaskManager\store\actions.ts
 * @Juck is coding...
 */
export default {
    setTasks: (context: any, payload: any) => {
        context.commit('setTasks', payload)
    },
    stopTask: (context: any, payload: any) => {
        context.commit('stopTask', payload)
    }
}
