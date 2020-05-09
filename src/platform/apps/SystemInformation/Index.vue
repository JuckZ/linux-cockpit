<!--
 * @Author: Juck
 * @Date: 2020-05-07 11:18:56
 * @LastEditTime: 2020-05-09 11:59:53
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\SystemInformation\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <div class="charts">

    <ECharts class="my-chart" :options="mem"/>
    <ECharts class="my-chart" :options="cpu"/>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    ECharts
  },
  data: function() {
    return {
      timerForGettingSystemResource: null,
    };
  },
  computed: {
    ...mapState('systemInformation', {
      memStatus: 'memStatus',
      cpuStatus: 'cpuStatus',
      timeInTheCpuState: 'timeInTheCpuState',
      timeInTheMemState: 'timeInTheMemState',
      systemVersion: 'systemVersion'
    }),
    ...mapState('login', {
      socket: 'socket'
    }),
    cpu: function() {
      return {
        title: {
          text: '15分钟CPU平均负载',
          left: 'center'
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['CPU平均负载']
        },
        xAxis: {
          name: '时间',
          nameLocation: 'end',
          data: this.timeInTheCpuState //处于对应状态时的时间
        },
        yAxis: {
          name: 'CPU使用率(%)',
          nameLocation: 'end',
        },
        series: [
          {
            name: 'CPU使用率',
            type: 'line',
            data: this.cpuStatus
          }
        ]
      }
    },
    mem: function() {
      return {
        title: {
          left: 'center',
          text: '内存使用率',
          show: true
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['内存使用率'],
          show: false
        },
        xAxis: {
          name: '时间',
          nameLocation: 'end',
          data: this.timeInTheMemState //处于对应状态时的时间
        },
        yAxis: {
          name: '内存使用率(%)',
          nameLocation: 'end',
        },
        series: [
          {
            name: '内存使用率',
            type: 'line',
            data: this.memStatus
          }
        ]
      }
    },
  },
  mounted() {
    // 系统挂载之后开始获取linux的系统资源信息（每隔时间t获取一次）
    const timeRangeForGettingSystemResource = 1000
    // TODO setInterval的this指向window，用箭头函数试试
    this.timerForGettingSystemResource = setInterval(() => {
      this.socket.emit('uploadScript', {
        target: 'systemInformation',
        options: {
          operation: 'setMemStatus'
        }
      })
      this.socket.emit('uploadScript', {
        target: 'systemInformation',
        options: {
          operation: 'setCpuStatus'
        }
      })
    }, timeRangeForGettingSystemResource)

    this.socket.on('systemInformationScriptRes', payload => {
      switch(payload.originPayload.options.operation) {
        case 'setMemStatus': {
           // 处理返回值
           let memUsage = 0
           memUsage = Math.round(parseFloat(payload.res.trim().split('\n')[1].split(/\s+/)[2])/1024)
          this.setMemStatus({
            options: {
              memUsage
            }
          })
          const now = new Date()
          this.setTimeInTheMemState({
            options: {
              time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            }
          })
        }
          break
        case 'setCpuStatus': {
          const resultLines =  payload.res.trim().split('\n')
          let cpuUsage = 0 //cpu占用率
          
          if(resultLines.length >= 8) {
            for( let i = 7; i < resultLines.length; i++) {
              cpuUsage += parseInt(parseFloat(resultLines[i].trim().split(/\s+/)[8]))
            }
          } else {
            // 使用率为0
            cpuUsage = 0
          }
          // 将数据存储到vuex中
          this.setCpuStatus({
            options: {
              cpuUsage
            }
          })
          const now = new Date()
          this.setTimeInTheCpuState({
            options: {
              time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            }
          })
        }
          break
      }
    })
  },
  destroyed() {
    clearInterval(this.timerForGettingSystemResource)
    this.socket.removeAllListeners(['systemInformationScriptRes'])
  },
  methods: {
    ...mapActions({
      setCpuStatus: 'systemInformation/setCpuStatus',
      setTimeInTheCpuState: 'systemInformation/setTimeInTheCpuState',
      setMemStatus: 'systemInformation/setMemStatus',
      setTimeInTheMemState: 'systemInformation/setTimeInTheMemState',
    })
  }
};
</script>
<style>
.my-chart {
  width: 50%;
}
.charts {
  display: flex;
}
</style>