/*
 * @Author: Juck
 * @Date: 2020-05-07 11:18:56
 * @LastEditTime: 2020-05-09 12:16:23
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\SystemInformation\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  setCpuStatus: ( state: any, payload: any) => {
    if(state.cpuStatus.length < 20) {
      state.cpuStatus.push(payload.options.cpuUsage)
    } else {
      const temp = state.cpuStatus.slice(1)
      temp.push(payload.options.cpuUsage)
      state.cpuStatus = temp
    }
  },
  setTimeInTheCpuState: ( state: any, payload: any) => {
    if(state.timeInTheCpuState.length < 20) {
      state.timeInTheCpuState.push(payload.options.time)
    } else {
      const temp = state.timeInTheCpuState.slice(1)
      temp.push(payload.options.time)
      state.timeInTheCpuState = temp
    }
  },
  setMemStatus: ( state: any, payload: any) => {
    console.info(payload.options.memUsage)
    if(state.memStatus.length < 5) {
      state.memStatus.push(payload.options.memUsage)
    } else {
      const temp = state.memStatus.slice(1)
      console.log(temp);
      
      temp.push(payload.options.memUsage)
      state.memUsage = temp
      console.log(temp);
      
    }
  },
  setTimeInTheMemState: ( state: any, payload: any) => {
    if(state.timeInTheMemState.length < 5) {
      state.timeInTheMemState.push(payload.options.time)
    } else {
      const temp = state.timeInTheMemState.slice(1)
      temp.push(payload.options.time)
      state.timeInTheMemState = temp
    }
  },
}
