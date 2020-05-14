<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-14 11:01:14
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\VideoPlayer\Index.vue
 * @Juck is coding...
 -->
<template>
  <div class="videoPlayer">
    <vue-plyr>
      <video :src="currentApp.status.initialData">
        <source
          :src="currentApp.status.initialData"
          type="video/mp4"
          size="720"
        />
        <source
          :src="currentApp.status.initialData"
          type="video/mp4"
          size="1080"
        />
        <track
          kind="captions"
          label="English"
          srclang="en"
          src="captions-en.vtt"
          default
        />
      </video>
    </vue-plyr>
    <!-- 播放列表 -->
  </div>
</template>
<style lang="css">
.videoPlayer {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
</style>
<script>
import Vue from 'vue'
// 导入plyr
import VuePlyr from 'vue-plyr'
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false },
  },
  emit: ['ended'],
})
export default {
  data() {
    return {
    }
  },
  props: ['currentApp'],
  computed: {},
  components: {
    VuePlyr,
  },
  mounted() {
    //
  },
  methods: {},
}
</script>
