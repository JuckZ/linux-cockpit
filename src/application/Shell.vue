<template>
  <div class="webssh">
    <div id="header">
        <div id="terminal"></div>
    </div>
  </div>
</template>
<script>
// import * as Terminal from 'xterm/dist/xterm'
// import * as fit from 'xterm/dist/addons/fit/fit'
// import * as attach from 'xterm/lib/addons/attach/attach'
// import * as zmodem from 'xterm/lib/addons/zmodem/zmodem'
// import * as search from 'xterm/lib/addons/search/search'
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
        fitAddon.fit()
        terminal.x = 2
        let command = ''
                // term相关
        terminal.onData((data)=>{
          terminal.write(data)
        })
          terminal.on('paste', function (data, ev) {
            terminal.write(data);
            window.console.log(ev)
        });
          const shellprompt = '$ ';
          terminal.prompt = function () {
                terminal.write('\r\n' + shellprompt);
                terminal.x=2
            };
          terminal.on('key', function (key, ev) {
            const printable = (
            !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            );

            if (ev.keyCode == 13) {
                // 回车，执行本行代码并跳转到下一行
                // 执行命令之后清空
                self.$store.state.socket.emit('command',command)
                command=''
                terminal.prompt();
            } else if (ev.keyCode == 8) {
                // Do not delete the prompt
                if (terminal.x > 2) {
                    // 退格，命令删掉一个字符，并且回显清楚一个字符
                    terminal.x--
                    command=command.slice(0,-1)
                    terminal.write('\b \b');
                }
            } else if (printable) {
                terminal.x++;
                terminal.write(key);
                command+=key
            }
        });
        self.$store.state.socket.on('result', (data)=> {
            terminal.write("\b \b\b \b"+data+"\n\r$ ");
        })
        self.$store.state.socket.on('ready', function () {
            terminal.writeln("Info: I am Ready")
            terminal.prompt();
            // socket.emit('geometry', terminal.cols, terminal.rows)
        })
        self.$store.state.socket.on('connect', function () {
            terminal.writeln("Info: Connected")
            terminal.prompt();
            // socket.emit('geometry', terminal.cols, terminal.rows)
        })
        self.$store.state.socket.on('disconnect', function () {
            terminal.writeln("Info: Disconnected")
            terminal.prompt();
            // socket.emit('geometry', terminal.cols, terminal.rows)
        })
    },
    methods:{
    },
    beforeDestroy(){
        // 销毁ws等进程
        // this.socket.disconnect()
    }
}
</script>