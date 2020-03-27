// @ts-check

/**
 * @param {{ where: import('../generated/prisma-client').UserWhereUniqueInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { Promise }
 */
const users = async (_, args, context) => {
  console.log("Query.users.args: %j", args)

  // const users = await context.prismaUsers(args.where);

  // console.log("Query.usser: %j", users)
  
  return [];
};

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

module.exports = {
  //user,
  users
};
