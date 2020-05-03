<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-03 17:49:49
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\TextEditor\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <!-- TAG 加载动画 -->
    <a-spin :spinning="!isLoaded" tip="Loading...">
      <div v-show="!isLoaded" class="spin-content">
        正在读取文件......
      </div>
    </a-spin>
    <VueEditor v-model="initialData"></VueEditor>
  </div>
</template>
<style lang="css">

@import "~vue2-editor/dist/vue2-editor.css"; 
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

</style>
<script>
import BUS from '@/platform/bus'
import { mapState } from 'vuex'
import { VueEditor, Quill } from 'vue2-editor'
  export default {
    data() {
      return {
        textData: '正在读取文件....',
        initialData: '',
        isLoaded: false
      };
    },
    props: ['currentApp'],
    computed: {
      ...mapState('config', {

      })
    },
    components: {
      VueEditor
    },
    mounted() {
      // 
      if(this.currentApp.status.initialData != undefined) {
        // FIXME加载动画应该放在回调函数中
        // 加载loading动画
        console.log('读取文件');
        
        // this.isLoaded = true
        
        // 下载文件，然后读取到initialData中，
        // 关闭loading动画
      } else {
        this.isLoaded = true
        console.log('空白文档');
        
      }
    }
  };
</script>
