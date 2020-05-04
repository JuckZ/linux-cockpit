<template>
  <a-layout id="components-layout-demo-top-side">
    <!-- TAG 搜索框 -->
    <a-layout-header class="header">
      <a-input-search
        class="searchBar"
        placeholder="input search text"
        @search="onSearch"
        enterButton
      />
      <!-- TAG 功能按钮区 -->
      <span id="fileManagerBtnGroup">
        <!-- 后退 cd .. -->
        <a-button
          @click="
            // 构造一个file对象（内容是home目录）
            currentStatus.targets = [
              {
                key: 0,
                type: 'd',
                name: '..',
              },
            ]
            execFileManagerOperation({
              options: {
                operation: 'open',
              },
            })
          "
          icon="backward"
        ></a-button>
        <!-- TODO 未实现前进功能 cd - -->
        <a-button icon="forward"></a-button>
        <a-button type="primary" icon="upload">上传</a-button>
        <a-button icon="download">下载</a-button>
        <a-button icon="folder-add">新建文件夹</a-button>
        <a-button icon="delete">删除</a-button>
        <!-- 切换视图 -->
        <div id="fileManagerChangeView">
          <img src="/assets/apps/FileManager/list.svg" alt="列表" />
          <img src="/assets/apps/FileManager/thumbnails.svg" alt="略缩图" />
        </div>
      </span>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="height: 100px, padding: 24px 0; background: #fff">
        <!-- overflow: 'auto', height: '80%', width: 'auto', position: 'absolute', left: 0,  -->
        <a-layout-sider :style="{ background: '#fff' }">
          <!-- FIXME 菜单收起按钮 -->
          <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="collapsed = !collapsed"
          >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            mode="inline"
            :inline-collapsed="collapsed"
            :defaultSelectedKeys="['1']"
            theme="light"
          >
            <a-menu-item key="1">
              <a-icon type="user" />
              <span>家目录</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="laptop" />
              <span>根目录</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="file" />
              <span>文档</span>
            </a-menu-item>
            <a-menu-item key="4">
              <a-icon type="picture" />
              <span>图片</span>
            </a-menu-item>
            <a-menu-item key="5">
              <a-icon type="play-circle" />
              <span>音乐</span>
            </a-menu-item>
            <a-menu-item key="6">
              <a-icon type="play-square" />
              <span>视频</span>
            </a-menu-item>
            <a-menu-item key="8">
              <a-icon type="rest" />
              <span>回收站</span>
            </a-menu-item>
            <a-menu-item key="9">
              <a-icon type="appstore" />
              <span>应用程序</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <!-- TAG 标签页 -->
          <a-tabs
            v-model="activeKey"
            type="editable-card"
            @change="onTabChange"
            @edit="onEdit"
          >
            <a-tab-pane
              v-for="pane in panes"
              :tab="pane.title"
              :key="pane.key"
              :closable="pane.closable"
            >
              <!-- TAG 完善面包屑 -->
              <a-breadcrumb separator="/" style="margin: 16px 0px">
                <a-breadcrumb-item href="">
                  <a-icon type="home" />
                </a-breadcrumb-item>
                <a-breadcrumb-item
                  v-for="item in getBreadcrumb"
                  :key="item"
                  @click="onBreadcrumbClick"
                  >{{ item }}</a-breadcrumb-item
                >
              </a-breadcrumb>
              <!-- 文件信息内容显示区 -->
              <div id="fileContainer">
                <div id="fileContent">
                  <!-- TAG 加载动画 -->
                  <a-spin :spinning="!isLoaded" tip="Loading...">
                    <div v-show="!isLoaded" class="spin-content">
                      正在读取文件......
                    </div>
                  </a-spin>
                  <!-- 表格区显示文件 -->
                  <a-table
                    v-show="isLoaded"
                    :pagination="{
                      pageSize: 5,
                      position: 'bottom',
                    }"
                    :style="{
                      cursor: 'pointer',
                    }"
                    size="middle"
                    :customRow="customClick"
                    :rowSelection="rowSelection"
                    :columns="columns"
                    :dataSource="tabs[activeKey].files"
                    @change="onPageChange"
                  >
                    <span slot="name" slot-scope="name, record">
                      <img
                        class="fileIcon"
                        :src="
                          getIcon(
                            record.type,
                            record.name
                              .split('.')
                              .pop()
                              .toLowerCase()
                          )
                        "
                      />
                      {{ name }}
                    </span>
                    <span slot="lastModified" slot-scope="lastModified">
                      {{
                        lastModified.month +
                          ' ' +
                          lastModified.day +
                          ' ' +
                          lastModified.timeOrYear
                      }}
                    </span>
                    <span slot="type" slot-scope="type, record">
                      {{
                        getType(
                          record.type,
                          record.name
                            .split('.')
                            .pop()
                            .toLowerCase()
                        )
                      }}
                    </span>
                  </a-table>
                  <!-- TAG右键菜单 -->
                  <a-menu
                    id="contextMenu"
                    :style="menuStyle"
                    v-if="contextMenu.visible"
                  >
                    <a-menu-item
                      @click="contextMenuClick($event, currentStatus)"
                      v-for="menuItem in menuData"
                      :key="menuItem.key"
                      >{{ menuItem.text }}</a-menu-item
                    >
                  </a-menu>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      total size: {{ tabs[activeKey].totalSize }} --- 共{{
        tabs[activeKey].files.length
      }}个项目 --- 选中{{ currentStatus.selectedRows.length }}项
    </a-layout-footer>
  </a-layout>
</template>

<style lang="scss" scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
#contextMenu {
  li {
    height: 20px;
    line-height: 20px;
  }
}
#components-layout-demo-top-side .searchBar {
  width: 160px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#fileManagerBtnGroup {
  text-align: end;
  button {
    margin-right: 10px;
  }
}
#fileManagerChangeView {
  display: inline-block;
  height: 32px;
  img {
    height: 32px;
  }
  img:hover {
    cursor: pointer;
  }
}
#fileContainer {
  position: relative;
}
.fileIcon {
  height: 20px;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    filters: [
      {
        text: '普通文件',
        value: '-',
      },
      {
        text: '目录文件',
        value: 'd',
      },
      {
        text: '管理文件',
        value: 'p',
      },
      {
        text: '链接文件',
        value: 'l',
      },
      {
        text: '块设备文件',
        value: 'b',
      },
      {
        text: '字符设备文件',
        value: 'c',
      },
      {
        text: '套接字文件',
        value: 's',
      },
    ],
    onFilter: (value, record) => {
      return record.type.indexOf(value) === 0
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'LastModified',
    dataIndex: 'lastModified',
    scopedSlots: { customRender: 'lastModified' },
    sorter: (a, b) => {
      // TODO完善比较修改日期的逻辑
      return a.lastModified - b.lastModified
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Type',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: 'Size',
    dataIndex: 'size',
    sorter: (a, b) => {
      // TODO完善比较大小的逻辑，把单位考虑上
      return a.size.split(/K/)[0] - b.size.split(/K/)[0]
    },
    sortDirections: ['descend', 'ascend'],
  },
]
const panes = [
  { title: 'Tab 0', content: 'Content of Tab 0', key: 0, closable: false },
]
export default {
  data() {
    return {
      columns,
      currentStatus: {
        targets: [], // 当前操作的文件对象数组
        srcDir: '', // 源路径（一般就是当前路径）
        destDir: '', // 目的路径
        operation: '', // 当前操作
        selectedRows: [], //当前选中的数据行
      },
      contextMenu: {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      },
      menuStyle: {
        position: 'fixed',
        top: '0',
        left: '0',
        border: '1px solid #eee',
      },
      initialized: false,
      panes,
      activeKey: panes[0].key, // 当前tabKey
      newTabIndex: 1,
      collapsed: false,
      isLoaded: false,
      customClick: (record) => ({
        on: {
          // 双击事件
          dblclick: (e) => {
            // 置currentStatus.targets
            this.currentStatus.targets = [record]
            // 执行open操作
            this.execFileManagerOperation({
              options: {
                operation: 'open',
                currentStatus: this.currentStatus,
              },
            })
          },
          // 右键事件
          contextmenu: (e) => {
            e.preventDefault()
            // 先判断多选情况，如果多选为空，则设置currentStatus.targets并弹出右键菜单，否则直接弹出右键菜单
            if (this.currentStatus.selectedRows.length == 0) {
              this.currentStatus.targets = [record]
            }
            // 显示右键菜单
            this.contextMenu.visible = true
            this.menuStyle.top = e.clientY + 'px'
            this.menuStyle.left = e.clientX + 'px'
            document.body.addEventListener('click', this.bodyClick)
          },
        },
      }),
    }
  },
  computed: {
    ...mapState('fileManager', {
      tabs: 'tabs',
      fileTypes: 'fileTypes',
      defaultContextMenu: 'defaultContextMenu',
    }),
    ...mapState('login', {
      socket: 'socket',
      stream: 'stream',
    }),
    ...mapState('config', {
      apps: 'apps',
    }),
    // 返回面包屑数组
    getBreadcrumb() {
      const tmp = this.tabs[this.activeKey].currentDir.split('/')
      // 去掉第一个空字符串元素
      return tmp.slice(1)
    },
    menuData() {
      // 根据this.currentStatus.targets和this.currentStatus.selectedRows自动修改菜单项
      if (this.currentStatus.targets.length == 0) {
        return []
      } else if (this.currentStatus.targets.length == 1) {
        const target = this.currentStatus.targets[0]
        let fileExt = ''
        switch (target.type) {
          case '-':
            fileExt = target.name
              .split('.')
              .pop()
              .toLowerCase()

            if (this.fileTypes[fileExt]) {
              // 如果后缀在state的fileTypes对象中找到了则：
              return [
                ...this.defaultContextMenu,
                ...this.fileTypes[fileExt].specialContextMenu,
              ]
            } else {
              return [...this.defaultContextMenu]
            }
          case 'd':
            return [
              ...this.defaultContextMenu,
              ...this.fileTypes.document.specialContextMenu,
            ]
          default:
            return [...this.defaultContextMenu]
        }
      } else {
        // 多个文件
        return [...this.defaultContextMenu]
      }
    },
    // 行选择
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.currentStatus.selectedRows = selectedRows
        },
      }
    },
  },
  beforeMount() {
    // 挂载前需要读取Linux服务器的目录情况
    // 构造一个file对象（内容是home目录）
    this.currentStatus.targets = [
      {
        key: 0,
        type: 'd',
        name: JSON.parse(sessionStorage.getItem('userInfo')).userName,
      },
    ]
    // 打开根目录
    this.execFileManagerOperation({
      options: {
        operation: 'open',
        currentStatus: this.currentStatus,
      },
    })
    // TODO监听响应并处理响应
    this.socket.on('scriptRes', (payload) => {
      console.log('res')
      // TODO 处理响应
      switch (payload.originPayload.options.operation) {
        case 'open':
          if (payload.originPayload.options.currentStatus.targets.length == 0) {
            console.log('没有操作对象')
          } else if (
            payload.originPayload.options.currentStatus.targets.length == 1
          ) {
            // 只有一个操作对象时
            const target =
              payload.originPayload.options.currentStatus.targets[0]
            // 如果是普通文件，则用对应的预览器打开
            if (target.type == '-') {
              // 根据文件后缀用不同的预览器打开
              // 先判断是否有相应可以使用的预览器
              console.log('根据文件后缀用不同的预览器打开')
              switch (
                target.name
                  .split('.')
                  .pop()
                  .toLowerCase()
              ) {
                case 'txt':
                case 'doc':
                  // TODO使用axios下载文件并将内容作为initialData传递给文本编辑器组件
                  this.axios.get(payload.fileSrc).then((res) => {
                    this.runApp({
                      app: this.apps.filter((app) => {
                        return app.componentName == 'TextEditor'
                      })[0],
                      options: {
                        initialData: res.data
                      }
                    })
                  })

                  break
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'img':
                  console.log('调用图片浏览器')
                  break
                case 'mp3':
                  console.log('调用音乐播放器')
                  break
                case 'mp4':
                  console.log('调用视频播放器')
                  break
                default:
                  console.log('暂时不支持此类型文件的预览')
              }
            } else if (target.type == 'd') {
              // 如果是目录文件，则打开目录
              this.parseOpenDirRes(payload)
            } else {
              // 如果是块设备文件等，则不进行操作
              console.log('暂不支持打开块设备')
            }
          }
          break
        case 'moveToTrash':
          console.log('移入回收站')
          break
        case 'attributes':
          console.log('属性')
          break
        default:
          console.log('其他操作等待开发')
      }
    })
  },
  destroyed() {
    // 清除socket的监听器
    this.socket.removeAllListeners(['scriptRes'])
  },
  methods: {
    ...mapActions({
      setInitialInformation: 'fileManager/setInitialInformation',
      addTab: 'fileManager/addTab',
      initTab: 'fileManager/initTab',
      setTab: 'fileManager/setTab',
      runApp: 'config/runApp',
    }),
    onSearch(val) {
      console.log(val)
    },
    //  页面修改时的函数
    onPageChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    // TODO点击面包屑跳转
    // 点击面包屑
    onBreadcrumbClick() {
      console.log('aaaaaaa')
    },
    execFileManagerOperation(payload) {
      this.socket.emit('uploadScript', {
        options: {
          operation: payload.options.operation,
          currentStatus: payload.options.currentStatus || this.currentStatus,
        },
      })
    },
    // 处理打开目录的返回值结果
    parseOpenDirRes(payload) {
      // 处理结果
      const resultLines = payload.chunk.trim().split('\n')
      const files = []
      for (let i = 1; i < resultLines.length; i++) {
        // 将每个结果的数组表示push到数组中，形成二维数组
        const fileItemProperties = resultLines[i].split(/\s+/)
        const fileItem = {
          key: i - 1,
          type: fileItemProperties[0].substr(0, 1),
          ownerAuth: fileItemProperties[0].substr(1, 3),
          groupAuth: fileItemProperties[0].substr(4, 3),
          othersAuth: fileItemProperties[0].substr(7, 3),
          linkCount: fileItemProperties[1],
          owner: fileItemProperties[2],
          group: fileItemProperties[3],
          size: fileItemProperties[4],
          lastModified: {
            month: fileItemProperties[5],
            day: fileItemProperties[6],
            timeOrYear: fileItemProperties[7],
          },
          name: fileItemProperties[8],
        }
        files.push(fileItem)
      }
      const tab = {
        totalSize: resultLines[0].split(' ')[1],
        currentDir:
          payload.originPayload.options.currentStatus.targets[0].name == '..'
            ? payload.originPayload.options.currentStatus.srcDir.substr(
                0,
                payload.originPayload.options.currentStatus.srcDir.lastIndexOf(
                  '/'
                )
              )
            : payload.originPayload.options.currentStatus.srcDir +
              '/' +
              payload.originPayload.options.currentStatus.targets[0].name,
        files: files,
      }

      if (this.initialized) {
        // FIXME vuex数组或者对象的值变化无法检测到
        this.setTab({
          options: {
            tabID: this.activeKey,
            tab: tab,
          },
        })
      } else {
        this.initTab({
          options: {
            tab: tab,
          },
        })
        this.initialized = true
      }
      this.currentStatus.srcDir = tab.currentDir
      this.isLoaded = true
    },
    bodyClick() {
      this.contextMenu.visible = false
      document.body.removeEventListener('click', this.bodyClick)
    },
    callback(key) {
      console.log(key)
    },
    onTabChange(activeKey) {
      console.log('changeTO' + activeKey)
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    add() {
      const panes = this.panes
      const activeKey = `${this.newTabIndex++}`
      console.log(activeKey)
      panes.push({
        title: 'Tab ' + activeKey,
        content: 'Content of new Tab',
        key: activeKey,
      })
      this.panes = panes
      this.activeKey = activeKey
      // 新增标签页到tabs中
      // TODO获取对应的files之后再add这个tab
      this.addTab({
        options: {
          tab: {
            currentDir: '',
            totalSize: '0K',
            files: [],
          },
        },
      })
    },
    remove(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter((pane) => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },
    contextMenuClick(payload, currentStatus) {
      let operation = ''
      for (const menuItem of this.menuData) {
        if (menuItem.key == payload.key) {
          operation = menuItem.operation
        }
      }
      this.execFileManagerOperation({
        options: {
          operation: operation,
          currentStatus: this.currentStatus,
        },
      })
    },
    // 根据文件类型返回图标路径
    getIcon(type, fileExt) {
      let iconPath = '/assets/apps/FileManager/vscode-icons'
      if (type == '-') {
        iconPath += '/file_type_'
        // TODO先判断是否有这样一个文件存在 普通文件file.svg
        // FIXME 应该默认存在这样的图标，如果没有，则使用默认图标 onerror="this.src='默认图片的url地址'"
        switch (fileExt) {
          case 'txt':
            return iconPath + 'text.svg'
          case 'doc':
          case 'docx':
            return iconPath + 'text.svg'
          case 'xlsx':
          case 'xls':
          case 'csv':
            return iconPath + 'excel2.svg'
          case 'js':
            return iconPath + 'js.svg'
          case 'json':
            return iconPath + 'json.svg'
          case 'c':
            return iconPath + 'c.svg'
          case 'cpp':
            return iconPath + 'cpp2.svg'
          case 'py':
            return iconPath + 'python.svg'
          case 'sh':
            return iconPath + 'shell.svg'
          case 'pdf':
            return iconPath + 'pdf.svg'
          case 'mp3':
          case 'wav':
          case 'ape':
          case 'flac':
          case 'ogg':
            return iconPath + 'audio.svg'
          case 'mp4':
          case 'rmvb':
          case '3gp':
          case 'rm':
          case 'wmv':
          case 'avi':
          case 'm4v':
          case 'mkv':
          case 'flv':
            return iconPath + 'video.svg'
          case 'jpg':
          case 'png':
          case 'jpeg':
          case 'ico':
          case 'svg':
          case 'gif':
          case 'bmp':
            return iconPath + 'image.svg'
          default:
            return '/assets/apps/FileManager/vscode-icons/default_file.svg'
        }
      } else if (type == 'd') {
        iconPath += '/folder_type_'
        switch (fileExt) {
          case 'mp3':
          case 'music':
            return iconPath + 'audio.svg'
          case 'videos':
            return iconPath + 'video.svg'
          case 'pictures':
            return iconPath + 'images.svg'
          case 'public':
            return iconPath + 'public.svg'
          case 'documents':
            return iconPath + 'docs.svg'
          default:
            return '/assets/apps/FileManager/vscode-icons/default_folder.svg'
        }
      }
    },
    // 返回文件类型
    getType(type, fileExt) {
      switch (type) {
        case '-':
          return fileExt + '文件'
        case 'd':
          return '文件夹'
        case 'p':
          return '管理文件'
        case 'l':
          return '链接文件'
        case 'b':
          return '块设备文件'
        case 'c':
          return '字符设备文件'
        case 's':
          return '套接字文件'
        default:
          '未知类型'
      }
    },
  },
}
</script>
