/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-27 22:52:47
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\actions.ts
 * @Juck is coding...
 */
export default {
    setInitialInformation: (context: any, payload: any) => {
        // 
    },
    // 设置家目录的值
    setHomeFiles: (context: any, payload: any) => {
        context.commit('setHomeFiles',payload)
    },
    setCurrentDir: (context: any, payload: any) => {
        context.commit('setCurrentDir',payload)
    }
}
