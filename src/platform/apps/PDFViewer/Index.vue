<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-07 09:46:38
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\PDFViewer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <iframe class="PDFViewer" :src="currentApp.status.initialData" frameborder="0"></iframe>
    <embed :src="currentApp.status.initialData" type="application/pdf" width="100%" height="100%">
  </div>
</template>
<style lang="css">
.PDFViewer {
  position: absolute;
  padding: 5%;
  height: 100%;
  width: 100%;
}
</style>
<script>
  export default {
    data() {
      return {
        // isLoaded: false
      };
    },
    props: ['currentApp'],
    computed: {

    },
    components: {
      
    },
    mounted() {
      // 
      if(this.currentApp.status.initialData != undefined) {
        this.initialData = this.currentApp.status.initialData
      } else {
        console.log('空白文件');
      }
    }
  };
</script>
