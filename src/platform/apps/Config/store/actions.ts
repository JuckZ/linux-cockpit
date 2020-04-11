/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-11 19:35:16
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\actions.ts
 * @Juck is coding...
 */
export default {
    // 设置app状态
    setAppStatus: (context: any, payload: any) => {
        context.commit('setAppStatus', payload)
    }
}
