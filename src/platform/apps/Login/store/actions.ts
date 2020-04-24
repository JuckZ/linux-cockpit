/*
 * @Author: Juck
 * @Date: 2020-04-02 20:24:01
 * @LastEditTime: 2020-04-23 15:43:29
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Login\store\actions.ts
 * @Juck is coding...
 */
import io from 'socket.io-client'
import graphqlUtil from '@/utils/graphql'
import gql from 'graphql-tag'
export default {
  login: async (context: any, formData: any) => {
    return await graphqlUtil.$apollo
      .mutate({
        mutation: gql`
          mutation login($loginInput: LoginInput) {
            login(loginInput: $loginInput) {
              # 返回的数据格式为loginRes，字段如下
              code
              msg
            }
          }
        `,
        variables: {
          loginInput: formData,
        },
      })
      .then((res: any) => {
        context.commit('setIsLogined', {
          userInfo: formData,
          ...res
        })
        // 创建socket对象
        const socket = io('http://localhost')
        context.commit('setSocket', socket)
        return res
      })
  },
  // 恢复登录状态
  restoreLogin: ( context: any, formData: any) => {
    context.commit('setIsLogined', {
      userInfo: formData,
      data: {
        login: {
          code: 200
        }
      }
    })
    // 创建socket对象
    const socket = io('http://localhost')
    context.commit('setSocket', socket)
  },
  // createSocket: async (context: any, socket: any) => {
  //   context.commit('setSocket', socket)
  // },

  // 修改登录方式
  changeLoginType: (context: any) => {
    context.commit('setUserInfoLoginType')
  },
}
