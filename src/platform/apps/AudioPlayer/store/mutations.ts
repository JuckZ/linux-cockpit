/*
 * @Author: Juck
 * @Date: 2020-05-08 23:35:35
 * @LastEditTime: 2020-05-08 23:59:35
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\AudioPlayer\store\mutations.ts
 * @Juck is coding...
 */
export default {
  // setCurrentAudioSrc: ( state: any, payload: any) => {
  //   state.currentAudioSrc = payload.options.currentAudioSrc
  // },
  addAudios: ( state: any, payload: any) => {
    // 合并并去重
    state.audios.push(...payload.options.audios)
    state.audios = Array.from(new Set(state.audios))
  },
}
