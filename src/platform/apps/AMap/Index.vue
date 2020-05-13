<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-13 09:56:15
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AMap\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <iframe class="aMap" src="http://map.baidu.com" frameborder="0"></iframe>
  </div>
</template>
<style lang="scss" scoped>
.aMap {
  float: flex;
  position: absolute;
  height: 90%;
  width: 90%;
}
</style>
<script>
export default {
  data() {
    return {}
  },
}
</script>
