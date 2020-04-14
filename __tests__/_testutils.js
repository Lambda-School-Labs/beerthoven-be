
// import ApolloServer and important pieces for creating test server
const {
  typeDefs,
  resolvers,
  ApolloServer
} = require('../apollo/src/index.js');

// import Prisma to connect to test database
const {Prisma} = require('../prisma/') // it should be testing prisma dir.