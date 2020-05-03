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
          <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
            <a-tab-pane
              v-for="pane in panes"
              :tab="pane.title"
              :key="pane.key"
              :closable="pane.closable"
            >
              <!-- TAG 完善面包屑 -->
              <a-breadcrumb style="margin: 16px 0px">
                <a-breadcrumb-item
                  v-for="item in tabs[0].currentDir.split('/')"
                  :key="item.length"
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
                    :dataSource="tabs[0].files"
                    @change="onChange"
                  >
                    <!-- TODO根据不同类型显示不同样式，以及略缩图、不同操作等 -->
                    <span slot="icon" slot-scope="type">
                      {{ type == 'd' ? '目录' : '普通文件' }}
                    </span>
                  </a-table>
                  <!-- TAG右键菜单 -->
                  <a-menu
                    id="contextMenu"
                    :style="menuStyle"
                    v-if="contextMenu.visible"
                  >
                    <a-menu-item
                      @click="contextMenuClick($event, currentItems)"
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
      total size: {{ tabs[0].totalSize }} --- 共{{ tabs[0].files.length }}个项目
      --- 选中0项
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
</style>

<script>
import { mapState, mapActions } from 'vuex'
const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    scopedSlots: { customRender: 'icon' },
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
    sorter: (a, b) => a.type.length - b.type.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Name',
    dataIndex: 'name',
    // TODO 完善名字排序逻辑
    sorter: (a, b) => a.name.length - b.name.length,
    // TODO添加搜索
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
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1', closable: false },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
]
export default {
  data() {
    return {
      columns,
      currentItems: [], // 保存当前选中的项目，用于操作时作为参数传递给处理函数
      contextMenu: {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      },
      menuData: [],
      menuStyle: {
        position: 'fixed',
        top: '0',
        left: '0',
        border: '1px solid #eee',
      },
      panes,
      activeKey: panes[0].key,
      newTabIndex: 0,
      collapsed: false,
      isLoaded: false,
      customClick: (record) => ({
        on: {
          // 双击事件
          dblclick: (e) => {
            let fileExt = '' // 文件后缀
            switch (record.type) {
              case '-':
                fileExt = record.name
                  .split('.')
                  .pop()
                  .toLowerCase()
                if (this.fileTypes[fileExt]) {
                  // 如果能够找到该后缀相关信息，则：
                  this.menuData.push(
                    ...this.defaultContextMenu,
                    ...this.fileTypes[fileExt].specialContextMenu
                  )
                  console.log('用默认软件打开已知文件')
                } else {
                  // 未知后缀的文件
                  this.menuData.push(...this.defaultContextMenu)
                  console.log('暂不支持打开此类文件')
                }
                break
              case 'd':
                this.menuData.push(
                  ...this.defaultContextMenu,
                  ...this.fileTypes.document.specialContextMenu
                )
                console.log('准备打开文件夹')
                // TODO
                break
              default:
                this.menuData.push(...this.defaultContextMenu)
                console.log('暂不支持操作块文件、设备文件等')
            }
          },
          // 右键事件
          contextmenu: (e) => {
            e.preventDefault()
            let fileExt = '' // 文件后缀
            this.currentItems = []
            this.currentItems.push(record)
            this.menuData = [] // 清空右键菜单
            switch (record.type) {
              case '-':
                fileExt = record.name
                  .split('.')
                  .pop()
                  .toLowerCase()
                if (this.fileTypes[fileExt]) {
                  this.menuData.push(
                    ...this.defaultContextMenu,
                    ...this.fileTypes[fileExt].specialContextMenu
                  )
                  console.log('后缀已知的文件')
                } else {
                  this.menuData.push(...this.defaultContextMenu)
                  console.log('后缀未知的文件')
                }

                break
              case 'd':
                this.menuData.push(
                  ...this.defaultContextMenu,
                  ...this.fileTypes.document.specialContextMenu
                )
                console.log('文件夹')
                break
              default:
                this.menuData.push(...this.defaultContextMenu)
                console.log('暂不支持操作块文件、设备文件等')
            }
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
      apps: 'apps'
    }),
    // 行选择
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      }
    },
  },
  beforeMount() {
    // 挂载前需要读取Linux服务器的目录情况
    this.execFileManagerOperation({
      options: {
        target: 'FileManager',
        operation: 'readDir',
      },
    })
    this.socket.on('scriptRes', (payload) => {
      switch (payload.originPayload.options.operation) {
        case 'readDir':
        case 'initialPictures': {
          const tab = {
            totalSize: '0K',
            currentDir: '/root',
            files: [],
          }
          // 处理结果
          const resultLines = payload.chunk.trim().split('\n')
          tab.totalSize = resultLines[0].split(' ')[1]
          // 先截取每一行到数组中，第一行到total变量中
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
            tab.files.push(fileItem)
          }
          // TODO 获取当前tab序列再设置tab
          this.initTab({
            options: {
              // FIXME
              tabID: 0,
              tab: tab,
            },
          })
          this.isLoaded = true
          break
        }
        default:
          console.log('default')
      }
    })
  },
  methods: {
    ...mapActions({
      setInitialInformation: 'fileManager/setInitialInformation',
      addTab: 'fileManager/addTab',
      initTab: 'fileManager/initTab',
      runApp: 'config/runApp'
    }),
    onSearch(val) {
      console.log(val)
    },
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    execFileManagerOperation(payload) {
      this.socket.emit('uploadScript', payload)
    },
    bodyClick() {
      this.contextMenu.visible = false
      document.body.removeEventListener('click', this.bodyClick)
    },
    callback(key) {
      console.log(key)
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    add() {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({
        title: 'New Tab',
        content: 'Content of new Tab',
        key: activeKey,
      })
      this.panes = panes
      this.activeKey = activeKey
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
    contextMenuClick(payload, currentItems) {
      // TODO 暂时就当currentItems只有一个文件，处理多文件的逻辑后面做
      // TAG暂时只做 txt png jpg mp3 mp4的预览功能即可
      if (currentItems[0].type == '-' && payload.key == 'd1') {
        // 期望操作：打开普通文件
        switch (
          currentItems[0].name
            .split('.')
            .pop()
            .toLowerCase()
        ) {
          case 'txt':
          case 'doc':
            // 打开文本处理器，并传递数据过去
            this.runApp({
              app: this.apps[11],
              options: {
                initialData: currentItems
              }
              })
            console.log('调用文本编辑器')
            break
          case 'png':
          case 'jpg':
          case 'jpeg':
          case 'img':
            console.log('调用图片浏览器')
            break
          case 'mp3':
            console.log('调用音乐播放器');
            break
          case 'mp4':
            console.log('调用视频播放器');
            break
          default:
            console.log('暂时不支持此类型文件的预览');
        }
      } else if(currentItems[0].type == 'd' && payload.key == 'd1') {
        // 期望操作：打开文件夹
        console.log('打开文件夹');
      } else if(currentItems[0].type != 'd' && currentItems[0].type != '-') {
        // 期望操作： 对块设备、字符设备等操作
        console.log('暂时不支持对块设备等文件的操作');
      }
    },
  },
}
</script>
