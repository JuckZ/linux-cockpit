/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-09 00:10:10
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\state.ts
 * @Juck is coding...
 */
export default {
  // 当前Tab
  currentTab: '',
  // 每个标签页的文件信息
  // tabs: [
  //   {
  //     currentDir: '/root', //当前所在路径
  //     totalSize: '50K', //当前路径下所有文件的总大小
  //     files: [
  //       {
  //         key: 0, //antD中的table需要
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
  tabs: [
    {
      currentDir: '',
      totalSize: '0K',
      files: []
    }
  ],
  // 默认菜单项
  defaultContextMenu: [
    {
      key: 'd1',
      text: '打开',
      operation: 'open'
    },
    {
      key: 'd2',
      text: '打开方式',
      operation: 'openWith'
    },
    {
      key: 'd3',
      text: '发送给',
      operation: 'sendTo'
    },
    {
      key: 'd4',
      text: '剪切',
      operation: 'cut'
    },
    {
      key: 'd5',
      text: '复制',
      operation: 'copy'
    },
    {
      key: 'd6',
      text: '重命名',
      operation: 'rename'
    },
    {
      key: 'd7',
      text: '创建快捷方式',
      operation: 'createShortcut'
    },
    {
      key: 'd8',
      text: '移入回收站',
      operation: 'moveToTrash'
    },
    {
      key: 'd9',
      text: '属性',
      operation: 'attributes'
    },
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
      specialContextMenu: [],
      // TODO鼠标悬浮信息
    },
    txt: {
      // 默认预览器
      previewer: 'TextEditor',
      // 运行器
      launchers: [
        'TextEditor'
      ],
      // 图标
      icon: '',
      // 特有菜单
      specialContextMenu: [
        {
          key: 's1',
          text: '编辑',
          operation: 'edit'
        },
        {
          key: 's2',
          text: '打印',
          operation: 'print'
        }
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
        {
          key: 's1',
          text: '编辑',
          operation: 'edit'
        },
        {
          key: 's2',
          text: '打印',
          operation: 'print'
        }
      ],
    },
    mp3: {
      previewer: 'AudioPlayer',
      launchers: [
        'AudioPlayer'
      ],
      icon: '',
      specialContextMenu: [
        {
          key: 's1',
          text: '播放',
          operation: 'play'
        },
        {
          key: 's2',
          text: '加入到播放列表',
          operation: 'addToPlayList'
        }
      ],
    },
    jpg: {
      previewer: 'PictureViewer',
      launchers: [
        'PictureViewer'
      ],
      icon: '',
      specialContextMenu: [
        {
          key: 's1',
          text: '编辑',
          operation: 'edit'
        },
        {
          key: 's2',
          text: '打印',
          operation: 'print'
        },
        {
          key: 's3',
          text: '设为壁纸',
          operation: 'setAsWallpaper'
        },
        {
          key: 's4',
          text: '加入壁纸库',
          operation: 'addToWallpaper'
        }
      ]
    },
    png: {
      previewer: 'PictureViewer',
      launchers: [
        'PictureViewer'
      ],
      icon: '',
      specialContextMenu: [
        {
          key: 's1',
          text: '编辑',
          operation: 'edit'
        },
        {
          key: 's2',
          text: '打印',
          operation: 'print'
        },
        {
          key: 's3',
          text: '设为壁纸',
          operation: 'setAsWallpaper'
        },
        {
          key: 's4',
          text: '加入壁纸库',
          operation: 'addToWallpaper'
        }
      ]
    },
    mp4: {
      previewer: 'VideoPlayer',
      launchers: [
        'VideoPlayer'
      ],
      icon: '',
      specialContextMenu: [
        {
          key: 's1',
          text: '播放',
          operation: 'play'
        },
      ],
    },
  }
}