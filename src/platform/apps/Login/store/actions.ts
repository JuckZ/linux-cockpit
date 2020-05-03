/*
 * @Author: Juck
 * @Date: 2020-04-02 20:24:01
 * @LastEditTime: 2020-05-03 10:49:09
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\Login\store\actions.ts
 * @Juck is coding...
 */
import io from 'socket.io-client'
import ss from 'socket.io-stream'
import graphqlUtil from '@/utils/graphql'
import gql from 'graphql-tag'
import BUS from '@/platform/bus'
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
        // 判断ssh连接是否成功，若成功则创建socket
        // 创建socket对象
        if(res.data.login.code===200){
          // 如果ssh验证成功，则进行后续操作
          const socket = io('http://localhost')
          const stream = ss.createStream()
          socket.emit('login', formData)
          socket.on('loginSuccess', (res: any) => {
            context.commit('setSocket', {
              socket,
              stream
            })
            // 创建成功后再触发socketInitialized事件
            BUS.$emit('socketInitialized')
          })
          socket.on('loginFailed', (res: any) => {
            console.log(res);
          })
        }
        return res
      })
  },
  // 修改登录方式
  changeLoginType: (context: any) => {
    context.commit('setUserInfoLoginType')
  },
}
