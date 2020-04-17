// @ts-check
const Query = {

  /**
   * @param {*} _parent
   * @param { [any] } args
   * @param { import('../context').Context } context
   * @param {*} _info
   */
  users(_parent, args, context, _info) {
    if(args) {
      return context.prisma.users(...args);
    }

    return context.prisma.users();
  },

  /**
   * @param {*} _parent
   * @param { import('../generated/prisma-client').UserWhereUniqueInput } args
   * @param { import('../context').Context } context
   * @param {*} _info
   */
  async user(_parent, args, context, _info) {
    const findUser = await context.prisma.$exists.user(args);

    if (!findUser) throw new Error("User with that id does not exist...");

    return context.prisma.user(args);
  },

  async persons(parent, args, { prisma }, info) {
    return prisma.persons(null, info);
  },

  async person(parent, args, { prisma }, info) {
    const findPerson = await prisma.$exists.person({ id: args.where.id });

    if (!findPerson) throw new Error("No person with that id...");

    return prisma.person({ id: args.where.id });
  },

  async events(parent, args, { prisma }, info) {
    return prisma.events(null, info);
  },

  async event(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error("Please enter an id");

    const findEvent = await prisma.$exists.event({ id: args.where.id });

    if (!findEvent) throw new Error('Event not found');

    return prisma.event({ id: args.where.id }, info);
  },

  //  Talents
  async talents(parent, args, { prisma }, info) {
    return prisma.talents(null, info);
  },

  //  Talent
  async talent(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error("Please enter an id");

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error("No talent with that ID found");

    const findTalent = await prisma.$exists.talent({ id: args.where.id });

    if (!findTalent) throw new Error('No talent with that ID found');

    return prisma.talent({ id: args.where.id }, info);
  },

  // Vendor
  async vendors(parent, args, { prisma }, info) {
    return prisma.vendors(null, info);
  },

  async vendor(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error("ID required for vendor");

    const findVendor = prisma.$exists.vendor({ id: args.where.id });

    if (!findVendor) throw new Error("Vendor not found...");

    return prisma.vendor({ id: args.where.id }, info);
  },

  // Ticket
  async tickets(parent, args, { prisma }, info) {
    return prisma.tickets(null, info);
  },

  async ticket(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error('ID required to find ticket');

    const findTicket = prisma.$exists.ticket({ id: args.where.id });
    if (!findTicket) throw new Error('Ticket not found');

    return prisma.ticket({ id: args.where.id }, info);
  },

  // Donation
  async donations(parent, args, { prisma }, info) {
    return prisma.donations(null, info);
  },
  async donation(parent, args, { prisma }, info) {
    if (!args.where.id) throw new Error('ID required to find that donation');

    const findDonation = prisma.$exists.donation({ id: args.where.id });
    if (!findDonation) throw new Error('Donation not found');

    return prisma.donation({ id: args.where.id }, info);
  },

  // Volunteer
  async volunteers(parent, args, { prisma }, info) {
    return prisma.volunteers(null, info);
  },

  async volunteer(_, args, { prisma }, info) {
    if (!args.where.id) throw new Error("Please enter an id");

    const findVolunteer = await prisma.$exists.volunteer({ id: args.where.id });

    if (!findVolunteer) throw new Error("Volunteer not found...");

    return prisma.volunteer({ id: args.where.id }, info);
  },
};

  async venues(_, args, { prisma }, info) {
    return prisma.venues(null, info);
  },

  async venue(_, args, { prisma }, info) {
    if (!args.where.id) throw new Error('Please enter an id');

    const findVenue = await prisma.$exists.venue({ id: args.where.id });

    if (!findVenue) throw new Error('Venue not found...');

    return prisma.venue({ id: args.where.id }, info);
  },
};

module.exports = Query;
