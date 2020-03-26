const { prisma } = require('../apollo/src/generated/prisma-client')
var faker = require('faker');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Generate a bunch of random users
  for (var i = 0; i < 20; i++) {
    await prisma.createUser({
      username: faker.internet.userName(),
      role: getRandomInt(1, 3),
    });
    await prisma.createPerson({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      tickets: [Ticket],
      donation: [Donation],
      volunteer: [Volunteer],
    })
    await prisma.createTicket({
      person: Person
    })
    await prisma.createDonation({
      person: Person
    })
    await prisma.createVolunteer({
      person: Person
    })
  }
} 

main().catch(e => console.error(e));