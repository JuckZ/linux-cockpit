/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-21 17:18:40
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\mutations.ts
 * @Juck is coding...
 */
export default {
    setAppStatus: ( state: any, payload: any ) => {
        // payload对象{ type: 事件类型, appID: 接收点击事件的appID}
        // const status = state.apps[payload.app.id].status
        const status = payload.app.status
        const type = payload.type
        // 定义设置窗口大小的操作
        function setWindow(payload: any) {
            switch(payload.btnType) {
                case 'close':
                    state.apps[payload.app.id].status.running = false
                    state.apps[payload.app.id].status.show = false
                    state.apps[payload.app.id].status.focus = false
                    break
                case 'fullscreen':
                    state.apps[payload.app.id].status.window = 'fullscreen'
                    state.apps[payload.app.id].status.show = true
                    state.apps[payload.app.id].status.focus = true
                    break
                case 'minus':
                    state.apps[payload.app.id].status.window = 'minimize'
                    state.apps[payload.app.id].status.show = false
                    state.apps[payload.app.id].status.focus = false
                    break
                case 'fullscreen-exit':
                    state.apps[payload.app.id].status.window = 'default'
                    state.apps[payload.app.id].status.show = true
                    state.apps[payload.app.id].status.focus = true
                    break
            }
        }

        switch (type) {
            case 'running':
                if(status.running == false) {
                    state.apps[payload.app.id].status.running = true
                    console.log('set running true')
                }
                break
            case 'cancelRunning':
                if(status.running == true) {
                    state.apps[payload.app.id].status.running = false
                    console.log('set running false')
                }
                break
            case 'installed':
                if(status.installed == false) {
                    state.apps[payload.app.id].status.installed = true
                    console.log('set installed true')
                }
                break
            case 'cancelInstalled':
                if(status.installed == true) {
                    state.apps[payload.app.id].status.installed = false
                    console.log('set installed false')
                }
                break
            case 'setWindow':
                setWindow(payload)
                break
            default:
                console.error('undified type')
                break
        }
        // console.log(payload.app.status.running)
        // 判断是否安装 installed
        // if(status.installed) {
        //     // 判断是否运行 running
        //     if(status.running) {
        //         // 判断是否显示 show
        //         if(status.show) {
        //             // 如果为显示状态，则将窗口边框变红闪烁两次，并置focus为true

                    
        //         }
        //         // 如果
                
        //     }
        // }
        // state.apps[payload.id].status.running = true
    }
}
