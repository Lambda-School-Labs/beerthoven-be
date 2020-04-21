// @ts-check

// Grab a fake context to pass to the resolvers
const mockContext = require("../testHelpers").mockContext;

// Load the functions we want to test
const { users, user } = require("./Query");

beforeEach(() => {
  // Reset all mocks so we can count calls
  jest.resetAllMocks();
});

describe("users", () => {
  it("should call the Prisma client once with no parameters and should return users received from the client", async () => {
    // Mock the Prisma client function that will be called, have it pass back an array of dummy users
    const fakeUsers = ["user1", "user2"]
    jest.spyOn(mockContext.prisma, 'users').mockImplementation(async () => { return fakeUsers; })

    // Execute the unit being tested
    const returnedUsers = await users(undefined, undefined, mockContext, undefined);

    expect(mockContext.prisma.users).toBeCalledTimes(1);
    expect(mockContext.prisma.users).toBeCalledWith();
    expect(returnedUsers).toEqual(returnedUsers)
  });
});

describe("user", () => {
  it("should throw an exception when PrismaClient.$exists.user() returns nothing", async () => {
    // Mock the Prisma client function we expect to be called
    jest.spyOn(mockContext.prisma.$exists, 'user').mockImplementation(async () => { return false; })

    // Execute the unit we're testing
    await expect(user(undefined, undefined, mockContext, undefined)).rejects.toThrow('User with that id does not exist...');

    // We expect the resolver to make the appropriate call to the Prisma client
    expect(mockContext.prisma.$exists.user).toBeCalledTimes(1);
  });

  it("should return the user from the Prisma client", async () => {
    // Mock the Prisma client function we expect to be called
    jest.spyOn(mockContext.prisma.$exists, 'user').mockImplementation(async () => { return true; })
    jest.spyOn(mockContext.prisma, 'user').mockImplementation(async () => { return {}; })

    // Execute the unit we're testing
    await user(undefined, undefined, mockContext, undefined)

    // We expect the resolver to make the appropriate calls to the Prisma client
    expect(mockContext.prisma.$exists.user).toBeCalledTimes(1);
    expect(mockContext.prisma.user).toBeCalledTimes(1);
  });
});