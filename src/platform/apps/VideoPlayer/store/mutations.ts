/*
 * @Author: Juck
 * @Date: 2020-05-08 23:40:40
 * @LastEditTime: 2020-05-09 00:02:03
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\VideoPlayer\store\mutations.ts
 * @Juck is coding...
 */
export default {
  //
  addVideos: ( state: any, payload: any) => {
    // 合并并去重
    state.videos.push(...payload.options.videos)
    state.videos = Array.from(new Set(state.videos))
  },
}
