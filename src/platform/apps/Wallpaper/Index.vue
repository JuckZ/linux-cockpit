<template>
  <div id="wallpaper" ref="wallpaper"></div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '',
    }
  },
  props: {
    // msg1: String,
  },
  // beforeCreate() {},
  mounted() {
    this.axios.get('https://bing.biturl.top/').then(res => {
      // 设置背景图片链接地址
      this.imgSrc = res.data.url
      this.$refs.wallpaper.style.cssText += `
      background:url(${this.imgSrc});
      background-position: top left;
      background-size: cover
      `
    })
  },
  methods: {
    test(res) {
      console.log(res)
    },
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
}
</style>
