/*
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-04-27 20:31:31
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\FileManager\store\state.ts
 * @Juck is coding...
 */
export default {
    /**
     * homeFiles: {
     *      totalSize: 文件总大小,
     *      files: 文件信息（对象数组）[
     *          {
     *              // antDesign table需要key值
     *              key: IDnumber，
     *              // 普通文件||目录文件||管理文件||链接文件||块设备文件||字符设备文件||套接字文件
     *              type: '-'||'d'||'p'||'l'||'b'||'c'||'s'，
     *              ownerAuth: 'rwx' || ...,
     *              groupAuth: 'rwx' || ...,
     *              othersAuth: 'rwx' || ...,
     *              linkCount: number,
     *              owner: 'root'||...,
     *              group: 'root'||...,
     *              size: String,
     *              lastModified: {
     *                  month: string,
     *                  day: string,
     *                  timeOrYear: string
     *              },
     *              name: stringOfFileName
     *          },
     *          {
     *              ...
     *          }
     *      ]
     * }
     * 
     */
  homeFiles: {
      totalSize: 0,
      files: []
  },
//   当前目录
  currentDir: '',
  
}
