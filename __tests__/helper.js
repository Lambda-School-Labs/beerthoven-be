const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../prisma/')
import resolvers from( '../apollo/src/resolvers/Mutation')

const { query, mutate } = createTestClient(server);

//  mocks: true  `ignores resolvers and mocks them out with random data to allow for testing`

const createTestServer = ctx => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: false,
    context: () => ctx
  })

  return createTestClient(server)
}
module.exports =  createTestServer




// query({
//   query: GET_EVENT,
//   variables: { id: "ck8qd0ecb000v07523uvv7sah" }
// });

// mutate({
//   mutation: UPDATE_EVENT,
//   variables: { id: "ck8qd0ecb000v07523uvv7sah", event_name  }
// })