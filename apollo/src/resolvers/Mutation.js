
// @ts-check
const { prisma } = require("../generated/prisma-client")

/**
 * @param {{ data: import('../generated/prisma-client').UserCreateInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { import('../generated/prisma-client').UserPromise }
 */

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

  async deletePerson(parent, args, { prisma }, info) {
    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('Person not found...');

    return prisma.deletePerson({ id: args.where.id });
  },

  async updatePerson(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error('ID is required!');

    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('Person not found...');

    return prisma.updatePerson({
      where: {
        id: args.where.id
      },
      data: args.data
    })
  },

  async createEvent(parent, args, { prisma }, info) {
    if (!args.data.event_name) throw new Error('Event name required!');

    return prisma.createEvent(args.data, info);
  },

  async updateEvent(parent, args, { prisma }, info) {
    console.log(args.where.event_id)
    if (!args.where.event_id) throw new Error('Enter event ID...');

    const findEvent = await prisma.$exists.event({ event_id: args.where.event_id })

    if (!findEvent) throw new Error('Event not found');

    return prisma.updateEvent({
      where: {
        event_id: args.where.event_id
      },
      data: args.data
    })

  },

  async createVendor(parent, args, { prisma }, info) {
    const emailTaken = await prisma.$exists.vendor({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    return prisma.createVendor(args.data, info);
  },
  
  async updateVendor(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error('ID required...');

    const findVendor = await prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error('Vendor not found...');

    return prisma.updateVendor({
      where: {
        id: args.where.id
      },
      data: args.data
    });
  },

  async deleteVendor(parent, args, { prisma }, info) {
    const findVendor = await prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error('Vendor with ID not found...');

    return prisma.deleteVendor({ id: args.where.id })
  },

  async createTalent(parent, args, { prisma }, info) {
    if (!args.data.talent_name || !args.data.performance_type || !args.data.address) throw new Error('Required fields name, type, address!');

    // const usernameTaken = await prisma.$exists.talent({email: args.data.email});

    // if (usernameTaken) throw new Error('Email taken');
    return prisma.createTalent(args.data);
  },

  async updateTalent(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error('Talent ID is required!');

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('Talent not found...');

    return prisma.updateTalent({
      where: {
        id: args.where.id
      },
      data: args.data
    })
  },

  async deleteTalent(parent, args, { prisma }, info) {
    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('Talent with ID not found...');

    return prisma.deleteTalent({ id: args.where.id })
  },










}

module.exports = Mutation;
