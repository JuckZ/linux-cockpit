<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-13 10:35:51
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\PDFViewer\Index.vue
 * @Juck is coding...
 -->
<template>
    <iframe class="PDFViewer" :src="currentApp.status.initialData" frameborder="0"></iframe>
</template>
<style lang="css">
.PDFViewer {
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
