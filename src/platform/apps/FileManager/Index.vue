<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <a-input-search
        class="searchBar"
        placeholder="input search text"
        @search="onSearch"
        enterButton
      />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="height: 100px, padding: 24px 0; background: #fff">
        <!-- overflow: 'auto', height: '80%', width: 'auto', position: 'absolute', left: 0,  -->
        <a-layout-sider :style="{ background: '#fff' }">
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            theme="light"
          >
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />家目录</span>
              <a-menu-item key="1">option1</a-menu-item>
            </a-sub-menu>
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
          <!-- TODO:完善面包屑 -->
          <a-breadcrumb style="margin: 16px 0px">
            <a-breadcrumb-item v-for="item in currentDir.split('/')" :key="item.length">{{item}}</a-breadcrumb-item>
          </a-breadcrumb>
          <!-- 功能按钮区 -->
          <div id="fileManagerBtnGroup">
            <a-button type="primary" icon="upload">上传</a-button>
            <a-button icon="download">下载</a-button>
            <a-button icon="folder-add">新建文件夹</a-button>
            <a-button icon="delete">删除</a-button>
            <!-- TODO:z-index问题，不能点击 -->
            <!-- 切换视图 -->
            <div id="fileManagerChangeView">
              <img src="/assets/apps/FileManager/list.svg" alt="列表" />
              <img src="/assets/apps/FileManager/thumbnails.svg" alt="略缩图" />
            </div>
          </div>
          <!-- 文件信息内容显示区 -->
          <div id="fileContainer">
            <div
            id="fileContent"
            @contextmenu.prevent="toggleContextMenu($event, 'payload')"
          >
            <a-table
              :pagination="{
                pageSize: 5,
                position: 'bottom',
              }"
              size="middle"
              :rowSelection="rowSelection"
              :columns="columns"
              :dataSource="homeFiles.files"
              @change="onChange"
            />
            <!-- 右键菜单 -->
              <ul
                id="contextMenu"
                :style="{
                  left: contextMenu.position.x,
                  top: contextMenu.position.y,
                }"
              >
                <li
                  v-for="contextMenuItem in contextMenuForDir"
                  :key="contextMenuItem.id"
                  v-show="contextMenu.visible"
                  @click="contextMenuItem.operation"
                >
                  {{ contextMenuItem.text }}
                </li>
              </ul>
          </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      total size: {{ this.homeFiles.totalSize }} --- 共{{
        this.homeFiles.files.length
      }}个项目 --- 选中?项
    </a-layout-footer>
  </a-layout>
</template>

<style lang="scss">
#components-layout-demo-top-side .searchBar {
  width: 120px;
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
#contextMenu {
  position: absolute;
  background: rgba(187, 187, 187,0.6);
  color: black;
  li {
    text-align: center;
    padding: 4px 40px;
    cursor: pointer;
    border: 1px solid black;
  }
  li:hover {
    background: rgba(255, 255, 255, .8);
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
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
const contextMenuForDir = [
  {
    id: 0,
    text: '打开',
    operation: () => {
      console.log('打开')
    },
  },
  {
    id: 1,
    text: '重命名',
    operation: () => {
      console.log('重命名')
    },
  },
  {
    id: 2,
    text: '剪切',
    operation: () => {
      console.log('剪切')
    },
  },
  {
    id: 3,
    text: '删除',
    operation: () => {
      console.log('删除')
    },
  },
  {
    id: 4,
    text: '复制',
    operation: () => {
      console.log('复制')
    },
  },
  {
    id: 5,
    text: '属性',
    operation: () => {
      console.log('属性')
    },
  },
]
const contextMenuForFile = [
  {
    id: 0,
    text: '打开',
    operation: () => {
      console.log('打开')
    },
  },
  {
    id: 1,
    text: '用指定软件打开',
    operation: () => {
      console.log('用指定软件打开')
    },
  },
  {
    id: 2,
    text: '下载',
    operation: () => {
      console.log('下载')
    },
  },
  {
    id: 3,
    text: '重命名',
    operation: () => {
      console.log('重命名')
    },
  },
  {
    id: 4,
    text: '剪切',
    operation: () => {
      console.log('剪切')
    },
  },
  {
    id: 5,
    text: '删除',
    operation: () => {
      console.log('删除')
    },
  },
  {
    id: 6,
    text: '复制',
    operation: () => {
      console.log('复制')
    },
  },
  {
    id: 7,
    text: '属性',
    operation: () => {
      console.log('属性')
    },
  },
]
export default {
  props: ['position'],
  data() {
    return {
      //
      columns,
      contextMenu: {
        visible: false,
        position: {
          x: 0,
          y: 0,
        },
      },
      contextMenuForDir,
      contextMenuForFile,
    }
  },
  computed: {
    ...mapState('fileManager', {
      initialInformation: 'initialInformation',
      homeFiles: 'homeFiles',
      currentDir: 'currentDir'
    }),
    ...mapState('login', {
      socket: 'socket',
      stream: 'stream',
    }),
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
    this.socket.emit('uploadScript', {
      target: 'fileManager',
      operation: 'initialInformation',
      script: 'initialInformation.sh',
    })
    this.socket.on('scriptRes', (payload) => {
      switch (payload.originPayload.operation) {
        case 'initialInformation': {
          const homeFiles = {
            totalSize: '0K',
            files: [],
          }
          // 处理结果
          const resultLines = payload.chunk.trim().split('\n')
          homeFiles.totalSize = resultLines[0].split(' ')[1]
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
            homeFiles.files.push(fileItem)
          }
          // 设置homeFiles和currentDir
          this.setHomeFiles(homeFiles)
          this.setCurrentDir('/'+JSON.parse(sessionStorage.getItem('userInfo')).userName)
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
      setHomeFiles: 'fileManager/setHomeFiles',
      setCurrentDir: 'fileManager/setCurrentDir'
    }),
    onSearch(val) {
      console.log(val)
    },
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    toggleContextMenu(event, payload) {
      // console.log(event, payload)
      console.log(event);
      this.contextMenu.position = {
        x: event.layerX + 'px',
        y: event.layerY + 'px',
      }
      // 在指定位置打开右键菜单
      this.contextMenu.visible = !this.contextMenu.visible
    },
  },
}
</script>
