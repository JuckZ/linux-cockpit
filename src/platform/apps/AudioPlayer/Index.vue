<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-12 16:43:01
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
  padding: 5%;
  height: 100%;
  width: 100%;
}
</style>
<script>
// import PDFJS from 'pdfjs-dist'
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
