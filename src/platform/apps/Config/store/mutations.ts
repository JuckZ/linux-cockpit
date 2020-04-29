/*
 * @Author: Juck
 * @Date: 2020-04-10 10:49:58
 * @LastEditTime: 2020-04-29 16:15:35
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Config\store\mutations.ts
 * @Juck is coding...
 */
export default {
    // initApps初始化所有的app
    initApps: (state: any, payload: any) => {
        state.apps = payload
    },
    // 修改app的位置坐标信息
    setAppStatusPositionCoordinate: (state: any, payload: any) => {
        state.apps[payload.app.id].status.position.left = payload.options.left
        state.apps[payload.app.id].status.position.top = payload.options.top
    },
    // TODO change current focus window 修改当前聚焦窗口
    // 添加待运行的app
    addToRunApps: (state: any, payload: any) => {
        state.toRunApps.push(payload)
    },
    // 清空待运行的app数组
    resetToRunApps: (state: any, payload: any) => {
        state.toRunApps = payload
    },
    // 将app窗口最大化
    setAppFullscreen: (state: any, payload: any) => {
        state.apps[payload.app.id].status.window = 'fullscreen'
        state.apps[payload.app.id].status.show = true
        state.focusAppID = payload.app.id
    },
    // 将app窗口最小化
    setAppMinimize: (state: any, payload: any) => {
        state.apps[payload.app.id].status.window = 'minimize'
        state.apps[payload.app.id].status.show = false
        state.focusAppID = -1  //需要用户重新聚焦新的窗口
    },
    // 将app窗口还原为默认
    setAppDefault: (state: any, payload: any) => {
        state.apps[payload.app.id].status.window = 'default'
        state.apps[payload.app.id].status.show = false
        state.focusAppID = payload.app.id
    },
    // 关闭app
    shutdownApp: (state: any, payload: any) => {
        state.apps[payload.app.id].status.running = false
        state.apps[payload.app.id].status.show = false
        state.focusAppID = -1 //需要用户重新聚焦新的窗口
    },
    // 运行app
    runApp: (state: any, payload: any) => {
        state.apps[payload.app.id].status.running = true
        state.apps[payload.app.id].status.show = true
        state.focusAppID = payload.app.id
    },
    // 设置app的窗口
    setAppStatusWindow: (state: any, payload: any) => {
        // 
        state.apps[payload.appID].status.window = payload.expectedVal
    },
    // 设置app的显示状态
    setAppStatusShow: (state: any, payload: any) => {
        state.apps[payload.appID].status.show = payload.expectedVal
    },
    // 设置app是否聚焦
    setAppStatusFocus: (state: any, payload: any) => {
        // TODO
        // 清除其他app的聚焦状态
        // 将所有show为true状态的app的foucs全部置为false，方便动态添加blur class的样式
        state.apps[payload.appID].status.focus = payload.expectedVal
    },
    // 设置app的位置
    setAppStatusPosition: (state: any, payload: any) => {
        // 
    },
    // 设置app是否安装
    setAppStatusInstalled: (state: any, payload: any) => {
        // 
    },
    // 设置app的图标
    setAppImgsrc: (state: any, payload: any) => {
        // 
    },
    // 设置app是否有桌面快捷方式
    setAppInDesktop: (state: any, payload: any) => {
        // 
    },
    // 设置app是否显示在开始菜单
    setAppInStartMenu: (state: any, payload: any) => {
        // 

    },
    setAppStatus: (state: any, payload: any) => {
        // payload对象{ type: 事件类型, appID: 接收点击事件的appID}
        // const status = state.apps[payload.app.id].status
        const status = payload.app.status
        const type = payload.type
        // 定义设置窗口大小的操作
        function setWindow(payload: any) {
            switch (payload.btnType) {
                case 'close':
                    state.apps[payload.app.id].status.running = false
                    state.apps[payload.app.id].status.show = false
                    break
                case 'fullscreen':
                    state.apps[payload.app.id].status.window = 'fullscreen'
                    state.apps[payload.app.id].status.show = true
                    state.apps[payload.app.id].status.focus = true
                    break
                case 'minimize':
                    state.apps[payload.app.id].status.window = 'minimize'
                    state.apps[payload.app.id].status.show = false
                    break
                case 'default':
                    state.apps[payload.app.id].status.window = 'default'
                    state.apps[payload.app.id].status.show = true
                    break
            }
        }

        switch (type) {
            case 'running':
                if (status.running == false) {
                    state.apps[payload.app.id].status.running = true
                    console.log('set running true')
                }
                break
            case 'cancelRunning':
                if (status.running == true) {
                    state.apps[payload.app.id].status.running = false
                    state.apps[payload.app.id].status.show = false
                    console.log('set running false')
                }
                break
            case 'installed':
                if (status.installed == false) {
                    state.apps[payload.app.id].status.installed = true
                    console.log('set installed true')
                }
                break
            case 'cancelInstalled':
                if (status.installed == true) {
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
