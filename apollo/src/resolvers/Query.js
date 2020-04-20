// @ts-check

  /**
   * @param {*} _parent
   * @param { [any] } args
   * @param { import('../context').Context } context
   * @param {*} _info
   */

const getUserInfo = require('./Helper');

const Query = {
  async users(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
      return prisma.users({ ...args });
    } catch (err) {
      throw err;
    }
  },

  async user(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findUser = await prisma.$exists.user({ id: args.where.id });

    if (!findUser) throw new Error('User with that id does not exist...');

    return prisma.user({ id: args.where.id });
  },

  async persons(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
      return prisma.persons({ ...args });
    } catch (err) {
      throw err;
    }
  },

  async person(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error('No person with that id...');

    return prisma.person({ id: args.where.id });
  },

  async events(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    return prisma.events({ ...args });
  },

  async event(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Please enter an id');

    const findEvent = await prisma.$exists.event({ id: args.where.id });

    if (!findEvent) throw new Error('Event not found');

    return prisma.event({ id: args.where.id });
  },

  //  Talents
  async talents(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
      return prisma.talents({ ...args });
    } catch (err) {
      throw err
    }
  },

  //  Talent
  async talent(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Please enter an id');

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('No talent with that ID found');

    return prisma.talent({ id: args.where.id }, info);
  },

  // Vendor
  async vendors(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
    return prisma.vendors({ ...args });
    } catch (err) {
      throw err
    }
  },

  async vendor(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('ID required for vendor');

    const findVendor = prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error('Vendor not found...');

    return prisma.vendor({ id: args.where.id }, info);
  },

  // Ticket
  async tickets(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
    return prisma.tickets({ ...args });
    } catch (err) {
      throw err;
    }
  },

  async ticket(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('ID required to find ticket');

    const findTicket = prisma.$exists.ticket({ id: args.where.id });
    if (!findTicket) throw new Error('Ticket not found');

    return prisma.ticket({ id: args.where.id }, info);
  },

  // Donation
  async donations(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
    return prisma.donations({ ...args });
      
    } catch (err) {
      throw err;
    }
  },

  async donation(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('ID required to find that donation');

    const findDonation = prisma.$exists.donation({ id: args.where.id });
    if (!findDonation) throw new Error('Donation not found');

    return prisma.donation({ id: args.where.id }, info);
  },

  // Volunteer
  async volunteers(parent, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
    return prisma.volunteers({ ...args });
    } catch (err) {
      throw err;
    }
  },
  
  async volunteer(_, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Please enter an id');

    const findVolunteer = await prisma.$exists.volunteer({ id: args.where.id });

    if (!findVolunteer) throw new Error('Volunteer not found...');

    return prisma.volunteer({ id: args.where.id }, info);
  },

  async venues(_, args, { prisma, user }, info) {
    getUserInfo(user);

    try {
    return prisma.venues({ ...args });
    } catch (err) {
      throw err;
    }
  },

  async venue(_, args, { prisma, user }, info) {
    getUserInfo(user);

    if (!args.where.id) throw new Error('Please enter an id');

    const findVenue = await prisma.$exists.venue({ id: args.where.id });

    if (!findVenue) throw new Error('Venue not found...');

    return prisma.venue({ id: args.where.id }, info);
  },
};

module.exports = Query;
