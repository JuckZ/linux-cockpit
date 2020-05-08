<template>
  <a-table
    :data-source="tasks"
    :columns="columns"
    :rowKey="(record) => record.pid"
  >
    <div
      slot="filterDropdown"
      slot-scope="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="(c) => (searchInput = c)"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        style="width: 188px; margin-bottom: 8px; display: block;"
        @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="
          () => handleSearch(selectedKeys, confirm, column.dataIndex)
        "
      />
      <a-button
        type="primary"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
      >
        Search
      </a-button>
      <a-button
        size="small"
        style="width: 90px"
        @click="() => handleReset(clearFilters)"
      >
        Reset
      </a-button>
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <span slot="action" slot-scope="record">
      <a-button @click="
      socket.emit('uploadScript', {
        target: 'taskManager',
        options: {
          operation: 'stopTask',
          task: record
        }
      })
      ">终止进程</a-button>
    </span>
    <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: '用户',
          dataIndex: 'user',
          key: 'user',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.user
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
        },
        {
          title: 'CPU占用',
          dataIndex: 'cpu',
          key: 'cpu',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.cpu
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          },
        },
        {
          title: '内存占用',
          dataIndex: 'mem',
          key: 'mem',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.mem
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          },
        },
        {
          title: '开始时间',
          dataIndex: 'start',
          key: 'start',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.start
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          },
        },
        {
          title: '进程命令',
          dataIndex: 'command',
          key: 'command',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.command
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          },
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    ...mapState('login', {
      socket: 'socket',
    }),
    ...mapState('taskManager', {
      tasks: 'tasks',
    }),
  },
  beforeMount() {
    this.socket.emit('uploadScript', {
      target: 'taskManager',
      options: {
        operation: 'setTasks',
      },
    })
    this.socket.on('taskManagerScriptRes', (payload) => {
      switch (payload.originPayload.options.operation) {
        case 'setTasks': {
          const tasks = []
          const resultLines = payload.res.trim().split('\n')
          for (let i = 1; i < resultLines.length; i++) {
            // 从index==7之后都是command的部分，应该重新组合起来
            const taskItemProperties = resultLines[i].trim().split(/\s+/)
            const taskItem = {
              user: taskItemProperties[0],
              pid: taskItemProperties[1],
              cpu: taskItemProperties[2],
              mem: taskItemProperties[3],
              vsz: taskItemProperties[4],
              rss: taskItemProperties[5],
              tty: taskItemProperties[6],
              stat: taskItemProperties[7],
              start: taskItemProperties[8],
              time: taskItemProperties[9],
              // TODO将命令处理一下，控制显示长度
              command: taskItemProperties.slice(10).toString(),
            }
            tasks.push(taskItem)
          }
          this.setTasks({
            options: {
              tasks: tasks,
            },
          })
          break
        }
        case 'stopTask':
          this.stopTask({
            options: {
              task: payload.originPayload.options.task,
            },
          })
          break
        default:
          console.log('no operation with taskManager')
      }
    })
  },
  destroyed() {
    this.socket.removeAllListeners(['taskManagerScriptRes'])
  },
  methods: {
    ...mapActions({
      setTasks: 'taskManager/setTasks',
      stopTask: 'taskManager/stopTask',
    }),
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
  },
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
