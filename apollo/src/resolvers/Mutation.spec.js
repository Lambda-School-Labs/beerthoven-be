// @ts-check

// Grab a fake context to pass to the resolvers
const mockContext = require('../testHelpers').mockContext;
// const { gql } = require('apollo-server-micro')

// Load the functions we want to test
const { createUser } = require('./Mutation');

beforeEach(() => {
  // Reset all mocks to we can count calls
  jest.resetAllMocks();
});

describe('createUser', () => {
  it('should create a single user', async () => {
    const fakeUser = {

      email: 'faker@example.com'
    }
    jest.spyOn(mockContext.prisma, 'createUser').mockImplementation(async () => { return fakeUser; })
    
    const dummyUser = await createUser(undefined, {email: 'faker@example.com'}, undefined, undefined)
  });

  // it('should create a user', () => {
  //   const user = gql`
  //     mutation {
  //       createUser(
  //         data: {
  //           email: 'tet@test.com'
  //         }
  //       ) {

  //       }
  //     }
  //   `
  // })
})