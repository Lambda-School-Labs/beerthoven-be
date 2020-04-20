// @ts-check
// const { prisma } = require("../generated/prisma-client")

/**
 * @param {{ data: import('../generated/prisma-client').UserCreateInput }} args
 * @param {{ prisma: import('../generated/prisma-client').Prisma }} context
 * @returns { import('../generated/prisma-client').UserPromise }
 */

const getUserInfo = require('./Helper');


const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Mutation = {
  //  User
  async createUser(_, args, { prisma, user }, info) {
    getUserInfo(user);

    args.data.email = args.data.email.toLowerCase();
    
    if (!args.data.email) throw new Error('Email name required!');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );

    if (!isValidEmail) throw new Error('email not in proper format');

    const emailTaken = await prisma.$exists.user({ email: args.data.email.toLowerCase() });

    if (emailTaken) throw new Error('email taken');

    return prisma.createUser(args.data, info);
  },


  async deleteUser(_, args, { prisma, user }, info) {
    getUserInfo(user);

    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('No user with that id...');

    return prisma.deleteUser({ id: args.where.id });
  },

  async updateUser(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    args.data.email = args.data.email.toLowerCase();
    
    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('No user with that id...');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );
    if (!isValidEmail) throw new Error('email not in proper format');

    return prisma.updateUser(
      {
        where: {
          id: args.where.id,
        },
        data: args.data,
      },
      info,
    );
  },

  //  Person
  async createPerson(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const emailTaken = await prisma.$exists.person({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );
    
    if (!isValidEmail) throw new Error('email not in proper format');

    if (args.data.zip < 10000 || args.data.zip > 99999)
      throw new Error('Enter valid zip');

    return prisma.createPerson(args.data, info);
  },

  async deletePerson(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('Person not found...');

    return prisma.deletePerson({ id: args.where.id });
  },

  async updatePerson(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('ID is required!');

    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('Person not found...');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );
    if (!isValidEmail) throw new Error('email not in proper format');

    return prisma.updatePerson({
      where: {
        id: args.where.id,
      },
      data: args.data,
    });
  },

  //  Venue
  async createVenue(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.data.name) throw new Error('Venue name required');

    return prisma.createVenue(args.data, info);
  },

  async deleteVenue(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findVenue = await prisma.$exists.venue({ id: args.where.id });

    if (!findVenue) throw new Error('Venue not found...');

    return prisma.deleteVenue({ id: args.where.id });
  },

  async updateVenue(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Venue ID required...');

    const findVenue = await prisma.$exists.venue({ id: args.where.id });

    if (!findVenue) throw new Error('Venue not found');

    return prisma.updateVenue({
      where: {
        id: args.where.id,
      },
      data: args.data,
    });
  },

  //Event
  async createEvent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.data.event_name) throw new Error('Event name required!');

    return prisma.createEvent(args.data, info);
  },

  async deleteEvent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findEvent = await prisma.$exists.event({ id: args.where.id });

    if (!findEvent) throw new Error('Event not found...');

    return prisma.deleteEvent({ id: args.where.id });
  },

  async updateEvent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Enter event ID...');

    const findEvent = await prisma.$exists.event({ id: args.where.id });

    if (!findEvent) throw new Error('Event not found');
    // add event required function later
    return prisma.updateEvent({
      where: {
        id: args.where.id,
      },
      data: args.data,
    });
  },

  //  Vendor
  async createVendor(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const emailTaken = await prisma.$exists.vendor({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );
    if (!isValidEmail) throw new Error('email not in proper format');
    return prisma.createVendor(args.data, info);
  },

  async updateVendor(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('ID required...');

    const findVendor = await prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error('Vendor not found...');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );

    if (!isValidEmail) throw new Error('email not in proper format');

    return prisma.updateVendor({
      where: {
        id: args.where.id,
      },
      data: args.data,
    });
  },

  async deleteVendor(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findVendor = await prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error('Vendor with ID not found...');

    return prisma.deleteVendor({ id: args.where.id });
  },

  //  Talent
  async createTalent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (
      !args.data.talent_name ||
      !args.data.performance_type ||
      !args.data.address
    )
      throw new Error('Required fields name, type, address!');

    const emailTaken = await prisma.$exists.talent({ email: args.data.email });

    if (emailTaken) throw new Error('Email taken');

    return prisma.createTalent(args.data);
  },

  async updateTalent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Talent ID is required!');

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('Talent not found...');

    const isValidEmail = emailExpression.test(
      String(args.data.email).toLowerCase(),
    );

    if (!isValidEmail) throw new Error('email not in proper format');

    return prisma.updateTalent({
      where: {
        id: args.where.id,
      },
      data: args.data,
    });
  },

  async deleteTalent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('Talent with ID not found...');

    return prisma.deleteTalent({ id: args.where.id });
  },
};

module.exports = Mutation;
