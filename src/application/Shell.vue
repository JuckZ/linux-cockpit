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
    terminal.x = 2;
    terminal.write('Hello there. It\'s a terminal\n\r# ')
    console.log(terminal);
    
    let printable = false;
    // 保存当前输入的命令
    let command = "";
    terminal.prompt = () => {
      terminal.write('\n\r# ')
    }
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
          console.log("Enter");
          // 提交命令并重置command值，然后将光标跳转到下一行行首
          this.uploadCommand({
            uploadCommand: command
          })
          command = "";
          terminal.prompt();
          break;
        case "Backspace":
          console.log("Backspace");
          if (terminal.x > 2) {
            // 退格，命令删掉一个字符，并且回显清楚一个字符
            terminal.x--;
            command = command.slice(0, -1);
            terminal.write("\b \b");
          }
          break;
        default:
          if (printable) {
            console.log('printable')
            terminal.x++;
            terminal.write(key);
            command += key;
          }
      }
    });
  },
  methods: {
    uploadCommand: async function(uploadCommand) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation uploadCommand($commandInput: CommandInput) {
              uploadCommand(commandInput: $commandInput) {
                # 返回的数据格式为CommandRes，字段如下
                commandRes
              }
            }
          `,
          variables: {
            commandInput: uploadCommand
          }
        })
        .then(res => {
            // 先将返回值中的commandRes解析出来，然后将'\n'替换为'\n\r# '，最后还需要再拼接一个'\n\r# '
            const data = res.data.uploadCommand.commandRes
            console.log(data)
            // const data = res.data.uploadCommand.commandRes.replace(/\n/,'\n\r# ')+'\n\r# '
          terminal.write(data)
        });
    },
  },
  beforeDestroy() {
    // 销毁ws等进程
    // this.socket.disconnect()
  }
};
</script>