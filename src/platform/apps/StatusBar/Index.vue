<!--
 * @Author: Juck
 * @Date: 2020-04-11 12:33:58
 * @LastEditTime: 2020-04-30 11:20:55
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\StatusBar\Index.vue
 * @Juck is coding...
 -->
<template>
<!-- 状态栏 -->
  <div id="statusBar" ref="statusBar">
    <!-- 日期 -->
    <span id="date">
      {{d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"}}
    </span>
    <!-- 时间 -->
    <span id="time">
      {{d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()}}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 
    d: new Date()
    }
  },
  computed: {
    // 
  },
  created() {
    //
    this.dateTime()
  },
  methods: {
    dateTime:function(){
        setInterval(() => {//定时器，每个一秒调用一次（这样就可以看到每一秒的时间变动啦）
            this.d = new Date()
            // const newtime = new Date();
            // this.time = this.getIncrease(newtime.getTime(), 2) + ':' + this.getIncrease(newtime.getMinutes(), 2) + ':' + this.getIncrease(newtime.getSeconds(), 2);
            // this.date = this.getIncrease(newtime.getFullYear(), 4) + '-' + this.getIncrease(newtime.getMonth()+1, 2) + '-' + this.getIncrease(newtime.getDate(), 2) + ' ' + this.week[newtime.getDay()];
        },1000);
    }
  },
}
</script>

<style scoped lang="scss">
#statusBar {
  text-align: center;
  top: 0;
  position: fixed;
  width: 100%;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
