<template>
  <div class="webssh">
    <div id="header">
      <div id="terminal"></div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { attach } from "xterm-addon-attach";
import { search } from "xterm-addon-search";
const terminal = new Terminal();

// socket部分
import io from "socket.io-client"
const socket = io('http://localhost');
socket.on('connect', function(){
    console.log('client connect');
});

socket.on('event', function(){
    console.log('event');
});
socket.on('commandRes', (commandRes) => {
    terminal.write(commandRes)
})
socket.on('disconnect', function(){
    console.log('client disconnect');
});

export default {
  data() {
    return {};
  },
  mounted() {
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    const ele = document.getElementById("terminal");
    terminal.open(ele);
    terminal.focus();
    // Make the terminal's size and geometry fit the size of #terminal
    fitAddon.fit();
    console.log(terminal);
    
    let printable = false;
    // 保存当前输入的命令
    let command = "";
    // terminal.prompt = () => {
    //   terminal.write('\n\r# ')
    // }
    // term相关
    terminal.onKey(data => {
      const key = data.domEvent.key;
      // 是否为可打印字符
      printable =
        !data.domEvent.altKey &&
        !data.domEvent.ctrlKey &&
        !data.domEvent.metaKey;
      
      switch (key) {
        case "Enter":
          // 清除terminal中当前行的内容（因为避免与服务端返回的内容重复），然后提交命令并重置command值
          for(let i = command.length; i > 0; i--){
              console.log('one');
            terminal.write("\b \b")
          }
          this.uploadCommand(command)
          command = "";
        //   terminal.prompt();
          break;
        case "Backspace":
          {
            // 退格，命令删掉一个字符，并且回显清除一个字符
            command = command.slice(0, -1);
            terminal.write("\b \b");
          }
          break;
        default:
          if (printable) {
            terminal.x++;
            terminal.write(key);
            command += key;
          }
      }
    });
  },
  methods: {
    uploadCommand: function(command) {
        // 发送命令让服务端执行
        socket.emit('uploadCommand',command)
    },
  },
  beforeDestroy() {
    // 销毁ws等进程
    // this.socket.disconnect()
  }
};
</script>