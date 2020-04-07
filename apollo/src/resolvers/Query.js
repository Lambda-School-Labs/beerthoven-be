// @ts-check

/**
 * @param {{ where: import('../generated/prisma-client').UserWhereUniqueInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { Promise }
 */
// const users = async (_, args, context) => {
//   console.log("Query.users.args: %j", args)

//   const users = await context.prisma.users(null, '{id username}');

//   console.log("Query.user: %j", users)
  
//   return [];
// };

/**
 * @param {{ where: import('../generated/prisma-client').UserWhereInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { Promise }
 */
// const users = async (_, args, context) => {
//   console.log("Query.user.args: %j", args)

//   const user = await context.prisma.users(args);

//   console.log("Query.user: %j", user)
  
//   return user;
// };

// module.exports = {
//   //user,
//   users
// };

const Query = {
  async users(parent, args, { prisma }, info) {

    return prisma.users(null, info)
  },

  async user(parent, args, { prisma }, info) {
    console.log(args.where.id)
    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('User with that id does not exist...');

    return prisma.user({ id: args.where.id }, info)
  },
  async persons(parent, args, { prisma }, info) {

    return prisma.persons(null, info)
  },
  async person(parent, args, { prisma }, info) {
    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('No person with that id...');

    return prisma.person({ id: args.where.id });
  }
}


module.exports = Query;