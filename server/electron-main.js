/*
 * @Author: Juck
 * @Date: 2020-03-14 10:02:16
 * @LastEditTime: 2020-05-14 18:10:57
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\electron-main.js
 * @Juck is coding...
 */
/**
 * electron入口文件
 * 创建koa后端服务，将vue打包的页面放入node容器中，首页访问地址假设为ip:port，
 * 接着启动一个应用窗口，加载该地址
 * 
 */
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
function createWindow () {   
  // 创建浏览器窗口
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  require('./koa-app')  //导入koa后端入口文件，建立koa服务端
  // TODO 地址需要修改
  win.loadURL('http://localhost:81')
  // 设置空菜单
  win.setMenu(null)
  // 设置窗口全屏
  win.setFullScreen(true)
  // 设置窗口图标
  win.setIcon(path.join(__dirname, 'logo.png'))
  // 打开开发者工具
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
