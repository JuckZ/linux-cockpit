<template>
  <div id="shell">
    <div id="header">
      <div id="terminal">
        
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#shell {
// 
}
</style>
<script>
// 一定要注意vue实例的生命周期，怎样创建对象才是最节约资源的：
// 我的思考：创建一次terminal但是每次的socket必须重新连接（考虑到安全问题）

import { mapState } from 'vuex'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { attach } from 'xterm-addon-attach'
import { search } from 'xterm-addon-search'
let terminal = null
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('login', {
      socket: 'socket',
      isLogined: 'isLogined',
    }),
  },
  created() {
    console.log('terminal created');
  },
  destroyed() {
    console.log('terminal destoryed');
    terminal.dispose()
    // this.socket.close()
  },
  mounted() {
    console.log('terminal mounted');
    terminal = new Terminal()
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    // FIXME
    // fitAddon.fit()
    const ele = document.getElementById('terminal')
    terminal.open(ele)
    terminal.focus()
    // socket部分
    // 检查登录状态，如果已经是登录状态才可以建立socket连接
    if (this.isLogined == true) {
      this.socket.on('connect', function () {
        console.log('client connect')
      })
      this.socket.on('commandRes', (commandRes) => {
        terminal.write(commandRes)
        // TODO 判断当输入exit，commandRes为logout时，关闭shell app
        // TAG 换种方式，监听shell是否结束，然后再执行响应操作
      })
      this.socket.on('disconnect', function () {
        console.log('client-- disconnect')
        console.log(this.socket)
      })
    } else {
      // this 指的是webssh
      // 提示您尚未登录，然后跳转到登录页面
      this.$parent.$message.error('来自shell的提醒：您尚未登录')
    }
    let printable = false
    // 保存当前输入的命令
    let command = ''
    // terminal.prompt = () => {
    //   terminal.write('\n\r# ')
    // }
    // term相关
    terminal.onKey((data) => {
      const key = data.domEvent.key
      // 是否为可打印字符
      printable =
        !data.domEvent.altKey &&
        !data.domEvent.ctrlKey &&
        !data.domEvent.metaKey

      switch (key) {
        case 'Enter':
          // 清除terminal中当前行的内容（因为避免与服务端返回的内容重复），然后提交命令并重置command值
          for (let i = command.length; i > 0; i--) {
            terminal.write('\b \b')
          }
          this.uploadCommand(command)
          command = ''
          //   terminal.prompt();
          break
        case 'Backspace':
          {
            // 退格，命令删掉一个字符，并且回显清除一个字符
            command = command.slice(0, -1)
            terminal.write('\b \b')
          }
          break
        default:
          if (printable) {
            terminal.x++
            terminal.write(key)
            command += key
          }
      }
    })
  },
  methods: {
    uploadCommand: function (command) {
      // 发送命令让服务端执行
      this.socket.emit('uploadCommand', command)
    },
  },
}
</script>
