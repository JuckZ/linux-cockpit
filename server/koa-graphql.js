const { ApolloServer, gql } = require('apollo-server-koa');
const Koa = require('koa');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  type User {
      id: String
      name: String
      password: String
  }

  type UserInfoInput {
      name: String
      password: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
      createUser(userInfoInput: UserInfoInput): User
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

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
      createUser: async (parent, args, context,) => {
          // 创建新的用户，需要先接收客户端传来的用户信息，然后处理并保存到数据库
        // let ret = await context.DBTools.newUser(args.userInfoInput.name ....)
        // await 
        return {
            id: 'xxxxx',
            name: 'xxxxx',
            password: 'xxxxxx'
        }
      }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa()
server.applyMiddleware({ app })
// The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
app.listen(80);
console.log(`Server running at port 80`)