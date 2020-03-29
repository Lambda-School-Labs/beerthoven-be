// @ts-check
const Logger = require('../logger');
const logger = new Logger('logger.log');
/**
 * @param { import('../generated/prisma-client').User } parent
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { Promise }
 */
const person = async (parent, _, context) => {
  console.log("User.person.parent: %j", parent)
  logger.log('Is this working')
  const person = await context.prisma.user({
    id: parent.id
  }).person();

  console.log("User.person: %j", person)

  return person;
};


module.exports = {
  person,
};