const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {

    //  get token from the headers
    const token = req.headers.authorization || "";
    //  retrieve a user with the token
    const user = getUser(token);
    //  add user to the context to allow restricted access
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});