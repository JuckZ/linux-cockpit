/*
 * @Author: Juck
 * @Date: 2020-04-02 20:24:01
 * @LastEditTime: 2020-04-10 13:06:04
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
        context.commit('setIsLogined', res)
        // 创建socket对象
        const socket = io('http://localhost')
        context.commit('setSocket', socket)
        return res
      })
  },
  // createSocket: async (context: any, socket: any) => {
  //   context.commit('setSocket', socket)
  // },

  // 修改登录方式
  changeLoginType: (context: any) => {
    context.commit('setUserInfoLoginType')
  },
}
