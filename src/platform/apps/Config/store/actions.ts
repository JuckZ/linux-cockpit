/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-23 09:54:12
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
        // TAG 对象拷贝问题（此处需要深拷贝）
        let oldVal = JSON.parse(JSON.stringify(context.state.apps))
        // 如果app需要验证登录并且用户未登录则给予提示
        if(payload.app.requiredAuth === true && !sessionStorage.getItem('isLogined') ) {
            // 如果未验证则：显示登录界面
            context.commit('setAppStatus', {
                type: 'running',
                app: context.state.apps[10]
            })
            // TODO 修改反馈方式为返回值，然后根据返回值的状态码等内容进行全局message组件的显示
        } else {
            // 如果已经为登录状态则直接将app的状态修改为运行状态
            context.commit('setAppStatus', payload)
            // 触发setAppStatus钩子
            const res = {
                oldVal: oldVal,
                newVal: JSON.parse(JSON.stringify(context.state.apps))
            }
            BUS.$emit('setAppStatus', res)
        }
        
    }
}


// 深拷贝
// function deepClone(obj) {
//     if (obj === null) return null; //null 的情况
//     if (obj instanceof RegExp) return new RegExp(obj); //正则表达式的情况
//     if (obj instanceof Date) return new Date(obj); //日期对象的情况
//     if (typeof obj === 'function') {
//       // Function来新构建函数对象，和之前的eval相比，
//       // 1：精简代码
//       // 2. 作用域被控制了
//       // 3. 安全性提高
//       // 4. 运行速度提高
//       return new Function('return(' + obj.toString() + ')')();
//     }
//     if (typeof obj != "object") {
//       //非复杂类型,直接返回 也是结束递归的条件
//       return obj;
//     }
//     //[].__proto__.constructor=Array()
//     //{}.__proto__.constructor=Object()
//     //根据obj的原型对象中的constructor创建新的obj对象，obj可以为{},[],或则自己定义的对象
//     var newObj = new obj.__proto__.constructor;
//     for (var key in obj) {
//       newObj[key] = deepClone(obj[key]);
//     }
//     return newObj;
//   }