<template>
  <div class="webssh">
    <div id="header">
      <div id="terminal"></div>
    </div>
  </div>
</template>
<script>
// 一定要注意vue实例的生命周期，怎样创建对象才是最节约资源的：
// 我的思考：创建一次terminal但是每次的socket必须重新连接（考虑到安全问题）
import gql from "graphql-tag";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { attach } from "xterm-addon-attach";
import { search } from "xterm-addon-search";
import io from "socket.io-client";
let socket;

export default {
  data() {
    return {};
  },
  beforeCreate() {
    //
  },
  created() {
    //
  },
  destroyed() {
    //
  },
  mounted() {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    const ele = document.getElementById("terminal");
    terminal.open(ele);
    terminal.focus();
    fitAddon.fit();
    // socket部分
    // 检查登录状态，如果已经是登录状态才可以建立socket连接
    if (this.$store.state.isLogined == true) {
      socket = io("http://localhost");
      socket.on("connect", function() {
        // console.log("client connect");
      });
      socket.on("commandRes", commandRes => {
        terminal.write(commandRes);
      });
      socket.on("disconnect", function() {
        // console.log("client disconnect");
      });
    } else {
      // this 指的是webssh
      // 提示您尚未登录，然后跳转到登录页面
      this.$parent.$message.error("您尚未登录");
      this.$parent.$parent.$router.push("/login");
    }
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
          for (let i = command.length; i > 0; i--) {
            terminal.write("\b \b");
          }
          this.uploadCommand(command);
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
      socket.emit("uploadCommand", command);
    }
  },
  beforeDestroy() {
    // 销毁ws等进程
    // this.socket.disconnect()
  }
};
</script>