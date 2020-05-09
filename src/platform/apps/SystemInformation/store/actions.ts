/*
 * @Author: Juck
 * @Date: 2020-05-07 11:18:56
 * @LastEditTime: 2020-05-09 11:48:54
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\SystemInformation\store\actions.ts
 * @Juck is coding...
 */
export default {
    setCpuStatus: (context: any, payload: any) => {
        context.commit('setCpuStatus', payload)
    },
    setTimeInTheCpuState: (context: any, payload: any) => {
        context.commit('setTimeInTheCpuState', payload)
    },
    setMemStatus: (context: any, payload: any) => {
        context.commit('setMemStatus', payload)
    },
    setTimeInTheMemState: (context: any, payload: any) => {
        context.commit('setTimeInTheMemState', payload)
    },
}
