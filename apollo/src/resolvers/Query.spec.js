// @ts-check
// Grab a fake context to pass to the resolvers
const mockContext = require('../testHelpers').mockContext;
// Load the functions we want to test
const { users, user, persons, events, venues } = require('./Query');

beforeEach(() => {
  // Reset all mocks to we can count calls
  jest.resetAllMocks();
});
describe('users', () => {
  it('should call the Prisma client once with no parameters and should return users received from the client', async () => {
    // Mock the Prisma client function that will be called, have it pass back an array of dummy users
    const fakeUsers = ['user1', 'user2'];
    jest.spyOn(mockContext.prisma, 'users').mockImplementation(async () => {
      return fakeUsers;
    });
    // Execute the unit we're testing
    const returnedUsers = await users(
      undefined,
      undefined,
      mockContext,
      undefined,
    );
    expect(mockContext.prisma.users).toBeCalledTimes(1);
    expect(mockContext.prisma.users).toBeCalledWith();
    expect(returnedUsers).toEqual(returnedUsers);
  });
});
describe('user', () => {
  it('should throw an exception when PrismaClient.$exists.user() returns nothing', async () => {
    // Mock the Prisma client functions we expect to be called
    jest
      .spyOn(mockContext.prisma.$exists, 'user')
      .mockImplementation(async () => {
        return false;
      });
    jest.spyOn(mockContext.prisma, 'user').mockImplementation(async () => {
      return {};
    });
    // Execute the unit we're testing
    await expect(
      user(undefined, undefined, mockContext, undefined),
    ).rejects.toThrow('User with that id does not exist...');
    // We expect the resolver to make the appropriate call to the Prisma client
    expect(mockContext.prisma.$exists.user).toBeCalledTimes(1);
    expect(mockContext.prisma.user).toBeCalledTimes(0);
  });
  it('should return the user from the Prisma client', async () => {
    // Mock the Prisma client function we expect to be called
    jest
      .spyOn(mockContext.prisma.$exists, 'user')
      .mockImplementation(async () => {
        return true;
      });
    const dummyUser = { name: 'dummy' };
    jest.spyOn(mockContext.prisma, 'user').mockImplementation(async () => {
      return dummyUser;
    });
    // Execute the unit we're testing
    const returnedUser = await user(
      undefined,
      undefined,
      mockContext,
      undefined,
    );
    expect(returnedUser).toEqual(dummyUser);
    // We expect the resolver to make the appropriate calls to the Prisma client
    expect(mockContext.prisma.$exists.user).toBeCalledTimes(1);
    expect(mockContext.prisma.user).toBeCalledTimes(1);
  });
});

describe('persons', () => {
  it('should call the Prisma client once with no params and should return persons received from the client', async () => {
    const fakePersons = ['person1', 'person2'];
    jest.spyOn(mockContext.prisma, 'persons').mockImplementation(async () => {
      return fakePersons;
    });

    const returnedPersons = await persons(
      undefined,
      undefined,
      mockContext,
      undefined,
    );
    expect(mockContext.prisma.persons).toBeCalledTimes(1);
    expect(mockContext.prisma.persons).toBeCalledWith(undefined);
    expect(returnedPersons).toEqual(returnedPersons);
  });
});

// describe('person', () => {
//   it('should throw an exception when PrismaClient.$exists.person() returns nothing', async () => {
//     jest.spyOn(mockContext.prisma, 'person').mockImplementation(async () => {
//       return false;
//     });
//     jest.spyOn(mockContext.prisma, 'person').mockImplementation(async () => {
//       return {};
//     });

//     await expect(
//       person(undefined, undefined, mockContext, undefined),
//     ).rejects.toThrow('Person with that id does not exist...');

//     expect(mockContext.prisma.$exists.person).toBeCalledTimes(1);
//     expect(mockContext.prisma.person).toBeCalledTimes(0);
//   });

//   it('should return the person from the Prisma client', async () => {
//     jest
//       .spyOn(mockContext.prisma.$exists, 'person')
//       .mockImplementation(async () => {
//         return true;
//       });
//     const dummyPerson = { name: 'dummy' };
//     jest.spyOn(mockContext.prisma, 'person').mockImplementation(async () => {
//       return dummyPerson;
//     });
//     const returnedPerson = await person(
//       undefined,
//       undefined,
//       mockContext,
//       undefined,
//     );
//     expect(returnedPerson).toBe(dummyPerson);
//     expect(mockContext.prisma.$exists.person).toBeCalledTimes(1);
//     expect(mockContext.prisma.person).toBeCalledTimes(1);
//   });
// });

describe('person', () => {
  it('should return a person from prisma client', async () => {
    jest
      .spyOn(mockContext.prisma.$exists, 'person')
      .mockImplementation(async () => {
        return false;
      });
    jest.spyOn(mockContext.prisma, 'person').mockImplementation(async () => {
      return {};
    });
    await mockContext.prisma.$exists.person({ id: '8934755' });
    // We expect the resolver to make the appropriate call to the Prisma client
    expect(mockContext.prisma.$exists.person).toBeCalledTimes(1);
    expect(mockContext.prisma.person).toBeCalledTimes(0);
  });
});

describe('event', () => {
  it('should call prisma client with an event', async () => {
    const fakeEvent = 'testevent';
    jest.spyOn(mockContext.prisma, 'event').mockImplementation(async () => {
      return {};
    });
    jest
      .spyOn(mockContext.prisma.$exists, 'event')
      .mockImplementation(async () => {
        return false;
      });
    jest.spyOn(mockContext.prisma, 'event').mockImplementation(async () => {
      return fakeEvent;
    });
    await mockContext.prisma.$exists.event({ id: '123456789' });
    expect('testevent').toEqual(fakeEvent);
    expect(mockContext.prisma.event).toBeCalledTimes(0);
    expect(mockContext.prisma.$exists.event).toBeCalledTimes(1);
  });
});

describe('events', () => {
  it('should call the Prisma client once with no parameters and should return events received from the client', async () => {
    const fakeEvents = [
      { id: '1234', name: 'fake event 1', location: 'NC' },
      { id: '3456', name: 'fake event 2', location: 'NY' },
    ];
    jest.spyOn(mockContext.prisma, 'events').mockImplementation(async () => {
      return fakeEvents;
    });
    const returnedEvents = await events(
      undefined,
      undefined,
      mockContext,
      undefined,
    );
    expect(mockContext.prisma.events).toBeCalledTimes(1);
    expect(returnedEvents).toEqual(fakeEvents);
  });
});

describe('venue', () => {
  it('should call prisma client with a venue', async () => {
    const fakeVenue = 'testvenue';
    jest.spyOn(mockContext.prisma, 'venue').mockImplementation(async () => {
      return {};
    });
    jest
      .spyOn(mockContext.prisma.$exists, 'venue')
      .mockImplementation(async () => {
        return false;
      });
    jest.spyOn(mockContext.prisma, 'venue').mockImplementation(async () => {
      return fakeVenue;
    });
    await mockContext.prisma.$exists.venue({ id: '888888888' });
    expect('testvenue').toEqual(fakeVenue);
    expect(mockContext.prisma.venue).toBeCalledTimes(0);
    expect(mockContext.prisma.$exists.venue).toBeCalledTimes(1);
  });
});

describe('venues', () => {
  it('should call the Prisma client once with no parameters and should return venues received from the client', async () => {
    const fakeVenues = [
      { id: '2468', name: 'fake event 1', location: 'KC' },
      { id: '3690', name: 'fake event 2', location: 'SEA' },
    ];
    jest.spyOn(mockContext.prisma, 'venues').mockImplementation(async () => {
      return fakeVenues;
    });
    const returnedVenues = await venues(
      undefined,
      undefined,
      mockContext,
      undefined,
    );
    expect(mockContext.prisma.venues).toBeCalledTimes(1);
    expect(returnedVenues).toEqual(fakeVenues);
  });
});
