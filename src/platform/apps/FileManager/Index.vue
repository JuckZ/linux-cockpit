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
              <a-breadcrumb style="margin: 16px 0px">
                <a-breadcrumb-item
                  v-for="item in tabs[activeKey].currentDir.split('/')"
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
                    :dataSource="tabs[activeKey].files"
                    @change="onPageChange"
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
      }}个项目 --- 选中0项
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
  { title: 'Tab 0', content: 'Content of Tab 0', key: 0, closable: false },
]
export default {
  data() {
    return {
      columns,
      currentStatus: {
        targets: [], // 当前操作的文件对象数组
        srcDir: '/', // 源路径（一般就是当前路径）
        destDir: '/', // 目的路径
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
      },
    })
    // TODO监听响应并处理响应
    this.socket.on('scriptRes', (payload) => {
      // TODO 处理响应
      console.log(payload)
      switch (payload.originPayload.options.operation) {
        case 'open':
          if (payload.originPayload.currentStatus.targets.length == 0) {
            console.log('没有操作对象')
          } else if (payload.originPayload.currentStatus.targets.length == 1) {
            // 只有一个操作对象时
            const target = payload.originPayload.currentStatus.targets[0]
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
                  console.log('调用文本编辑器')
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
              // TODO target.name还需要加上当前路径srcDir
              console.log(
                '打开目录' + payload.originPayload.currentStatus.srcDir + target.name
              )
              this.parseResponse(payload)
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
  methods: {
    ...mapActions({
      setInitialInformation: 'fileManager/setInitialInformation',
      addTab: 'fileManager/addTab',
      initTab: 'fileManager/initTab',
      runApp: 'config/runApp',
    }),
    onSearch(val) {
      console.log(val)
    },
    //  页面修改时的函数
    onPageChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    execFileManagerOperation(payload) {
      this.socket.emit('uploadScript', {
        ...payload,
        currentStatus: this.currentStatus,
      })
    },
    // 处理返回的结果
    parseResponse(payload) {
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
      this.initTab({
        options: {
          tab: tab,
        },
      })
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
      // TODO now
      // TODO 暂时就当currentStatus.targets只有一个文件，处理多文件的逻辑后面做
      this.execFileManagerOperation({
        options: {
          operation: payload.key, // TODO根据菜单的key值确定菜单对应的operation
          target: 'selected' || this.currentStatus.targets, // thisline进行判断，selected为空则赋值当前这个
          destDir: this.currentStatus.destDir,
          srcDir: this.currentStatus.srcDir,
        },
      })
    },
  },
}
</script>
