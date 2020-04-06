
// @ts-check
const { prisma } = require("../generated/prisma-client")
// const Logger = require('../logger');
// const logger = new Logger('logger.log')
/**
 * @param {{ data: import('../generated/prisma-client').UserCreateInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { import('../generated/prisma-client').UserPromise }
 */
// const createUser = (_, args, context) => {
//   // console.log("createUser.args: %j", args);
//   // console.log('This is context: ', context);
//   // fs.appendFileSync('hello.txt', "\n you're awesome \n")
//   // const userTaken = context.prisma.users.some(user => user.username === args.data.username);

//   // if (userTaken) throw new Error('Username is taken...') 

//   const user = context.prisma.createUser(args.data);  

//   return user;
// };

// module.exports = {
//   createUser,
// };
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (!args.data.username) throw new Error('User name required!');

    const usernameTaken = await prisma.$exists.user({username: args.data.username});

    if (usernameTaken) throw new Error('Username taken');

    return prisma.createUser(args.data, info); 
  },

  async deleteUser(parent, args, { prisma }, info) {
    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('No user with that id...');

    return prisma.deleteUser({ id: args.where.id })
  },

  async updateUser(parent, args, { prisma }, info) {
    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('No user with that id...');


    return prisma.updateUser({
        where: {
          id: args.where.id
        },
        data: args.data
    }, info)
  },

  async createPerson(parent, args, { prisma }, info) {
    const emailTaken = await prisma.$exists.person({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    return prisma.createPerson(args.data, info)
  },

  async createEvent(parent, args, { prisma }, info) {
    if (!args.data.event_name) throw new Error('Event name required!');

    return prisma.createEvent(args.data, info)
  },

  async createVendor(parent, args, { prisma }, info) {
    const emailTaken = await prisma.$exists.vendor({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    return prisma.createVendor(args.data, info);
  }
}



module.exports = Mutation;
