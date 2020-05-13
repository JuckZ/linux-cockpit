<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-12 18:14:31
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AudioPlayer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <audio class="audioPlayer" autoplay loop controls>
      <source :src="currentApp.status.initialData" type="audio/mp3">
    您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>
<style lang="css">
.audioPlayer {
  position: absolute;
  display: inline-block;
  height: 80%;
  width: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      // isLoaded: false
    }
  },
  props: ['currentApp'],
  computed: {},
  components: {},
  mounted() {
    //
    if (this.currentApp.status.initialData != undefined) {
      this.initialData = this.currentApp.status.initialData
    } else {
      console.log('空白文件')
    }
  },
}
</script>
