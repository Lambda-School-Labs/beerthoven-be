// @ts-check

/**
 * @param { import('../generated/prisma-client').User } parent
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { Promise }
 */
const person = async (parent, _, context) => {
  console.log("User.person.parent: %j", parent)

  const person = await context.prisma.user({
    id: parent.id
  }).person();

  console.log("User.person: %j", person)

  return person;
};


module.exports = {
  person,
};