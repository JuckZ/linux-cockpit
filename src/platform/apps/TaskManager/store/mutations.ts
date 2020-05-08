/*
 * @Author: Juck
 * @Date: 2020-04-10 16:57:46
 * @LastEditTime: 2020-05-08 11:34:34
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\TaskManager\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setTasks: ( state: any, payload: any) => {
    state.tasks = payload.options.tasks
  },
  stopTask: ( state: any, payload: any) => {
    state.tasks = state.tasks.filter((task: any) => {
      return task.pid != payload.options.task.pid
    })
  }
}
