// @ts-check

/**
 * @param {{ data: import('../generated/prisma-client').UserCreateInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { import('../generated/prisma-client').UserPromise }
 */
const createUser = (_, args, context) => {
  console.log("createUser.args: %j", args);
  console.log('This is context: ', context);

  // const userTaken = users.some(user => user.username === args.data.username);

  // if (userTaken) throw new Error('Username is taken...') 

  const user = context.prisma.createUser(args.data);  

  return user;
};

module.exports = {
  createUser,
};
