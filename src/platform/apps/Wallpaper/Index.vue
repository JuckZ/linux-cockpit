<template>
  <div :style="'background:url(' + imgSrc + ')'" id="wallpaper">
    wallpapaer{{ msg1 }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '',
    }
  },
  props: {
    msg1: String,
  },
  // beforeCreate() {},
  mounted() {
    this.axios.get('https://bing.biturl.top/').then(res => {
      this.imgSrc = res.data.url
      this.test('testing')
      // console.log(this.data)
    })
  },
  methods: {
    test(res) {
      console.log(res)
      console.log(this.imgSrc)
    },
  },
}
</script>

<style lang="scss">
#wallpaper {
  top: 0;
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 500px;
}
</style>
