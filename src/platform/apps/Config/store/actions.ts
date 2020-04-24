/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-23 21:42:10
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\actions.ts
 * @Juck is coding...
 */
import BUS from '../../../bus'
export default {
    // 将app窗口最大化
    setAppFullscreen: (context: any, payload: any) => {
        context.commit('setAppFullscreen', payload)
    },
    // 将app窗口最小化
    setAppMinimize: (context: any, payload: any) => {
        context.commit('setAppMinimize', payload)
    },
    // 将app退出全屏，即设置为default
    setAppDefault: (context: any, payload: any) => {
        context.commit('setAppDefault', payload)
    },
    // 关闭app
    shutdownApp: (context: any, payload: any) => {
        context.commit('shutdownApp', payload)
    },
    // 运行app
    runApp: (context: any, payload: any) => {
        const oldVal = JSON.parse(JSON.stringify(context.state.apps))
        if (
            payload.app.requiredAuth === true
            && !sessionStorage.getItem('isLogined')
        ) {
            // 如果未验证则：显示登录界面
            context.commit('runApp', {
                // 获取loginApp并作为参数传递
                app: context.state.apps[10]
            })
        } else {
            context.commit('runApp', payload)
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