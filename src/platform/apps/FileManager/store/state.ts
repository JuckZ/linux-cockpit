/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-30 21:17:31
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\state.ts
 * @Juck is coding...
 */
export default {
  // 当前左侧Tab
  currentLeftTab: '',
  // 当前Tab
  currentTab: '',
  // 每个标签页的文件信息
  // tabs: [
  //   {
  //     currentDir: '/root', //当前所在路径
  //     totalSize: '50K', //当前路径下所有文件的总大小
  //     files: [
  //       {
  //         key: 0, // antDesign table需要key值
  //         type: '-'||'d'||'p'||'l'||'b'||'c'||'s', // 普通文件||目录文件||管理文件||链接文件||块设备文件||字符设备文件||套接字文件
  //         ownerAuth: 'rwx',
  //         groupAuth: 'rwx',
  //         othersAuth: 'rwx',
  //         linkCount: 6,
  //         owner: 'root',
  //         group: 'root',
  //         size: '5K',
  //         lastModified: {
  //             month: 'Mar',
  //             day: '18',
  //             timeOrYear: '18:10'
  //         },
  //         name: 'hello.txt'
  //       },
  //     ]
  //   }
  // ]
  tabs: [],
  // 默认菜单项
  defaultContextMenu: [
    '打开',
    '打开方式',
    '发送给',
    '剪切',
    '复制',
    '重命名',
    '创建快捷方式',
    '移入回收站'
  ],
  fileTypes: {
    document: {
      // 默认预览器
      previewer: '',
      // 运行器
      launchers: [
        ''
      ],
      // 图标
      icon: '',
      // 特有菜单
      specialContextMenu: [
        
      ],
      // TODO鼠标悬浮信息
    },
    txt: {
      // 默认预览器
      previewer: 'FileEditor',
      // 运行器
      launchers: [
        'FileEditor'
      ],
      // 图标
      icon: '',
      // 特有菜单
      specialContextMenu: [
        '编辑',
        '打印'
      ],
      // TODO鼠标悬浮信息
    },
    doc: {
      previewer: 'WPS',
      launchers: [
        'WPS'
      ],
      icon: '',
      specialContextMenu: [
        '编辑',
        '打印'
      ],
    },
    mp3: {
      previewer: 'MusicPlayer',
      launchers: [
        'MusicPlayer'
      ],
      icon: '',
      specialContextMenu: [
        '播放',
        '加入到播放列表'
      ],
    },
    jpg: {
      previewer: 'PictureViewer',
      launchers: [
        'PictureViewer'
      ],
      icon: '',
      specialContextMenu: [
        '打印',
        '编辑',
        '设为壁纸',
        '加入到壁纸库'
      ],
      mp4: {
        previewer: 'VideoPlayer',
        launchers: [
          'VideoPlayer'
        ],
        icon: '',
        specialContextMenu: [
          '播放'
        ],
      }
    }
  }
}
