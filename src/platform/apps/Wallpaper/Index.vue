<template>
  <div
    id="wallpaper"
    :style="`background-image:url(${wallpaperSrc})`"
    ref="wallpaper"
  ></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      imgSrc: '',
    }
  },
  props: {
    // msg1: String,
  },
  mounted() {
    // 设置背景图片链接地址
    this.setWallpaperSrc()
  },
  computed: {
    ...mapState('wallpaper', {
      wallpaperSrc: 'wallpaperSrc',
    }),
  },
  methods: {
    ...mapActions({
      setWallpaperSrc: 'wallpaper/setWallpaperSrc',
    }),
  },
}
</script>

<style lang="scss">
#wallpaper {
  top: 0;
  position: fixed;
  z-index: -5;
  width: 100%;
  height: 100%;
  background-position: top left;
  background-size: cover;
}
</style>
