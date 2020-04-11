/*
 * @Author: Juck
 * @Date: 2020-03-18 17:01:40
 * @LastEditTime: 2020-04-11 14:24:17
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\utils\graphql.js
 * @Juck is coding...
 */
const { ApolloServer, gql } = require('apollo-server-koa');
const { connectSSH, commandSSH } = require('./shell.js')
const typeDefs = gql`
  input LoginInput {
      IP: String
      userName: String
      password: String
      remember: Boolean
  }
  type LoginRes {
      code: Int
      msg: String
  }
  type Query {
    loginRes: LoginRes
  }
  type Mutation {
      login(loginInput: LoginInput): LoginRes
  }
`;

let conn = null
const resolvers = {
  Query: {
    // books: () => books,
  },
  Mutation: {
      login: async (parent, args, context) => {
          const reqData = args.loginInput
          // 尝试使用ssh登录，注意要取出Promise对象的isReady属性进行判断登录结果
          const shellRes = await connectSSH(reqData.IP, reqData.userName, reqData.password, reqData.remember)
          let msg = ''
          let code = 500
          conn = null
            if(shellRes.isReady) {
                code = 200
                msg = '登录成功，即将跳转到桌面'
                conn = await shellRes.conn
            }
            else {
                code = 500
                msg = '登录超时，请检查您输入的信息'
                conn = null
            }
            return await {
                code: code,
                msg: msg
            }
      }
  }
};


const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  server: server
}
