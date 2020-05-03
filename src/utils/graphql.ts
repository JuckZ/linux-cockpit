/*
 * @Author: Juck
 * @Date: 2020-04-02 21:19:57
 * @LastEditTime: 2020-05-03 10:16:15
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\utils\graphql.ts
 * @Juck is coding...
 */
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
Vue.use(VueApollo)
// // 产生apollo客户端实例对象
const apolloClient = new ApolloClient({
  uri: 'http://localhost:80/graphql',
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
export default new Vue({
  apolloProvider,
})