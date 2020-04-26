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
    // 
  },
  destroyed() {
    // 每次销毁要清除commandRes事件监听器
    this.socket.removeAllListeners(['commandRes'])
    terminal.dispose()
    // this.socket.close()
  },
  mounted() {
    terminal = new Terminal()
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    // FIXME shell窗口高度调节
    fitAddon.fit()
    const ele = document.getElementById('terminal')
    terminal.open(ele)
    terminal.focus()
    // socket部分
    this.socket.on('commandRes', (commandRes) => {
      terminal.write(commandRes)
      // TODO 判断当输入exit，commandRes为logout时，关闭shell app
      // TAG 换种方式，监听shell是否结束，然后再执行响应操作
    })
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
