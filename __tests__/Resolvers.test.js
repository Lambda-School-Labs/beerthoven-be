// const { createTestClient } = require('apollo-server-testing');

// const { query, mutate } = createTestClient(server);

// //  imports
// const { createTestClient } = require('apollo-server-testing')
// const { ApolloServer, gql } = require('apollo-server-micro')
// const typeDefs = require('./schema')
// const directives = require('./directives')
// const { merge } = require('lodash')
// const userResolvers = require('./resolvers-user')
// const test = require('ava')
// const { ObjectId } = require('pg')

// //  env configuration
// require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` })

// //  initialize ApolloServer
// var context = { user: { id: ck909ulep4eu30814pp81c2co , email: 'Allen88@hotmail.com', role: 'ADMIN' } }
// const server = new ApolloServer({
//   typeDefs,
//   resolvers: merge(
//     userResolvers
//   ),
//   context: () => (context),
//   schemaDirectives: directives
// })
// const { query, mutate } = createTestClient(server)

// // Share context between tests
// var result = {}

// test.serial('Create user Acme', async t => {
//   const CREATE_USER = gql`
//   mutation createUser( $name: String!) {
//     createUser(name: $name) {
//       id
//     }
//   }
//   `
//   result = merge(result, await mutate({
//     mutation: CREATE_USER,
//     variables: { name: 'Acme' }
//   }))
//   t.assert(ObjectId.isValid(result.data.createUser.id))
// })

// test.serial('Get user Acme by Id', async t => {
//   const GET_USER = gql`
//   query user($id: String) {
//     user(id: $id) {
//       id
//       name
//     }
//   }
//   `
//   result = merge(result, await query({
//     query: GET_USER,
    
//     variables: { id: result.data.createUSER.id }
//   }))
//   t.is(result.data.user.name, 'Acme')
// })

// test.serial('Mutate user Acme to AcmeX', async t => {
//   const UPDATE_USER = gql`
//   mutation updateUser($id: String!, $name: String) {
//     updateUser(id: $id, name: $name) {
//       success
//     }
//   }
//   `
//   result = merge(result, await mutate({
//     mutation: UPDATE_USER,
//     variables: { id: result.data.createUser.id, name: 'AcmeX' }
//   }))
//   t.assert(result.data.updateUser.success)
// })

// test.serial('Delete user Acme by Id', async t => {
//   const DELETE_USER = gql`
//   mutation deleteUser( $id: String!) {
//     deleteUser(id: $id) {
//       success
//     }
//   }
//   `
//   result = merge(result, await mutate({
//     mutation: DELETE_USER,
//     variables: { id: result.data.createUser.id }
//   }))
//   t.assert(result.data.deleteUser.success)
// })