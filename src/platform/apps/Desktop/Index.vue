<template>
  <div id="desktop">
    this is desktop
    <WallPaper msg1="1111" />
  </div>
</template>

<script>
import WallPaper from '@/platform/apps/Wallpaper/Index.vue'
export default {
  name: 'desktop',
  components: {
    WallPaper,
  },
  mounted() {
    if (this.$store.state.isLogined) {
      this.$router.push('/desktop')
    }
    console.log(this.$store.state.isLogined)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
