const { prisma } = require('../apollo/src/generated/prisma-client')
var faker = require('faker');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// date_created: DateTime! @createdAt
//   username: String!
//   person: Person
//   role: Int

async function main() {
  // Generate a bunch of random users
  for (var i = 0; i < 10; i++) {
    await prisma.createUser({
      username: faker.internet.userName(),
      
     
    });
  }
}

main().catch(e => console.error(e));