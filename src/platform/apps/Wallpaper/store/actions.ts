export default {
  //   aa: return this.axios.get('https://bing.biturl.top/').then(res => {
  // }),
  // 读取用户配置并设置背景（持久化配置）
  // 设置图片地址
  setWallpaperSrc: (context: any, payload: any) => {
    // console.log(context.state)
    // const wallpaperSrc = payload.url
    // const wallpaperSrc = '/assets/win7/wallpaper.jfif'
    const wallpaperSrc =
      '/assets/win7/OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg'
    context.commit('setWallpaperSrc', wallpaperSrc)
  },
}
