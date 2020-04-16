/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-16 13:34:20
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\actions.ts
 * @Juck is coding...
 */
import BUS from '../../../bus'
export default {
    // 设置app状态
    setAppStatus: (context: any, payload: any) => {
        
        // console.log(context.state.apps[8].status.running);
        /* eslint-disable */
        // let tt = context
        console.log(context);
        
        // console.log(tt.state.apps);
        // console.log(tt.state.apps[8].status.running);
        
        // 如果app需要验证登录并且用户未登录则给予提示
        if(payload.requiredAuth === true ) {
            alert('需要验证')
            // TODO 修改反馈方式为返回值，然后根据返回值的状态码等内容进行全局message组件的显示
        } else {
            // 如果已经为登录状态则直接将app的状态修改为运行状态
            context.commit('setAppStatus', payload)
            // 触发setAppStatus钩子
            const res = {
                // oldVal: oldVal,
                newVal: context.state.apps
            }
            BUS.$emit('SetAppStatus', res)
        }
        
    }
}
