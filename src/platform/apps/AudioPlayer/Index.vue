<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-14 11:41:51
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AudioPlayer\Index.vue
 * @Juck is coding...
 -->
<template>
  <aplayer
    class="audioPlayer"
    autoplay
    theme="pic"
    shuffle
    repeat="list"
    show-lrc
    :muted.sync="muted"
    :volume.sync="volume"
    :music="audios[0]"
    :list="audios"
  />
</template>
<style lang="css">
/* .audioPlayer {
  text-align: center;
} */
</style>
<script>
import Aplayer from 'vue-aplayer'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      volume: 1,
      muted: false,
    }
  },
  props: ['currentApp'],
  computed: {
    ...mapState('audioPlayer', {
      audios: 'audios'
    })
  },
  name: 'App',
  components: {
    Aplayer,
  },
  mounted() {
    //
  },
}
</script>
