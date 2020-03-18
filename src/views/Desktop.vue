<template>
  <div class="webssh">
    <div id="header">
        <div id="terminal"></div>
    </div>
  </div>
</template>
<script>
import "xterm/css/xterm.css"
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { attach } from 'xterm-addon-attach'
import { search } from 'xterm-addon-search'
export default {
    
    data(){
        return {
        }
    },
    mounted() {
        // const self=this;
        const terminal = new Terminal();
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        const ele = document.getElementById("terminal")
        terminal.open(ele)
        terminal.focus()
// Make the terminal's size and geometry fit the size of #terminal
        fitAddon.fit()
        // terminal.x = 2
        // 保存当前输入的命令
        let command = ''
        // term相关
        // terminal.cursorBlink = true
        terminal.onData((data)=>{
          terminal.write(data)
          command += data
          this.axios.post("http://localhost/api/application/shell",{
            "data": data
          }).then((response) => {
            console.log(response)
          })
        })
        // terminal.onKey((key, ev)=>{
        // //   terminal.write(key)
        //   const printable = (
        //     !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
        //   );
        //   terminal.write(`keycode:+{ev}`)
        //   if (ev.keyCode == 13) {
        //         // 回车，执行本行代码并跳转到下一行
        //         // 执行命令之后清空
        //         self.$store.state.socket.emit('command',command)
        //         command=''
        //         term.prompt();
        //     } else if (ev.keyCode == 8) {
        //         // Do not delete the prompt
        //         if (term.x > 2) {
        //             // 退格，命令删掉一个字符，并且回显清楚一个字符
        //             term.x--
        //             command=command.slice(0,-1)
        //             term.write('\b \b');
        //         }
        //     } else if (printable) {
        //         term.x++;
        //         term.write(key);
        //         command+=key
        //     }
        // })
    },
    methods:{
    },
    beforeDestroy(){
        // 销毁ws等进程
        // this.socket.disconnect()
    }
}
</script>