const { ApolloServer, gql } = require('apollo-server-koa');
const { connectSSH, commandSSH } = require('./shell.js')
const typeDefs = gql`
  input BookInput {
    title: String
    author: String
  }
  input CommandInput {
    uploadCommand: String
  }
  type CommandRes {
    commandRes: String
  }
  type Book {
    title: String
    author: String
  }
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
    books: [Book],
    loginRes: LoginRes
  }
  type Mutation {
      addBook(bookInput: BookInput): Book
      login(loginInput: LoginInput): LoginRes
      uploadCommand(commandInput: CommandInput): CommandRes
  }

`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

let conn = null
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
      addBook: (parent, args, context) => {
        return {
            title: args.bookInput.title,
            author: args.bookInput.author
        }
      },
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
      },
      uploadCommand: async (parent, args, context) => {
        const uploadCommand = args.commandInput.uploadCommand
        const resData = await commandSSH(uploadCommand)
        return {
                commandRes: await resData.commandRes
            }
      }
  }
};


const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  server: server
}
