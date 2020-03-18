const { ApolloServer, gql } = require('apollo-server-koa');
const typeDefs = gql`
  input BookInput {
    title: String
    author: String
  }
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
      addBook(bookInput: BookInput): Book
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
      }
  }
};


// let isLogin = false
// const {
//     conn,
//     Login
// } = require("./login")

// TODO:配置一个全部请求都要经过的路由，通过next方法进行后续匹配？，验证是否登录，未登录则返回一个信息，由前端路由跳转
// const auth = ( ctx, next ) => {
//     console.log(`验证登录情况和token等--- 方法： ${ctx.request.method} 路径：${ctx.request.path}`)
//     next()
// }

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  server: server
}
