const { prisma } = require("../apollo/src/generated/prisma-client");
var faker = require("faker");

const performanceType = [
  "Aria",
  "Cadenza",
  "Concerto",
  "Chamber music",
  "Movement",
  "Sonata",
  "Opera",
  "Opus",
  "Overture",
  "Symphony"
];

Array.prototype.randomPerformance = function() {
  return this[Math.floor(Math.random() * this.length)];
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Generate a bunch of random users
  for (var i = 0; i < 20; i++) {
    await prisma.createEvent({
      event_name: faker.company.companyName(),
      event_type: faker.company.companySuffix(),
      event_address: faker.address.streetAddress(),
      event_description: faker.company.catchPhraseNoun(),
      max_capacity: getRandomInt(1, 900),
      min_capacity: getRandomInt(1, 40),
      min_income: getRandomInt(50000, 105000),
      deposit_amount: getRandomInt(400, 800),
      smoking_allowed: faker.random.boolean(),
      under21_allowed: faker.random.boolean(),
      under18_allowed: faker.random.boolean(),
      tickets_sold: getRandomInt(1, 900),
      wheelchair_accessible: faker.random.boolean(),
      alcohol_beer_served: faker.random.boolean(),
      alcohol_wine_served: faker.random.boolean(),
      alcohol_spirits_served: faker.random.boolean(),
      food_served: faker.random.boolean(),
      // vendor: [Vendor],
      setup_costs: getRandomInt(1, 2000),
      talent_costs: faker.random.number(),
      opening_time: faker.random.number(),
      closing_time: faker.random.number(),
      event_date: faker.random.number(),
      tabc_certified: faker.random.boolean(),
      indoor_event: faker.random.boolean(),
      outdoor_vent: faker.random.boolean(),
      parking_lot_available: faker.random.boolean(),
      parking_max_capacity: getRandomInt(10, 250),
      sales_gross: getRandomInt(2000, 9000),
      sales_net: getRandomInt(1000, 8000)
    });
    await prisma.createVendor({
      company_name: faker.company.companyName(),
      email: faker.internet.email(),
      vendor_type: faker.company.companySuffix()
    });

    await prisma.createPerson({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
      // tickets: [Ticket],
      // donation: [Donation],
      // volunteer: [Volunteer],
    });

    await prisma.createTicket({});

    await prisma.createDonation({});

    await prisma.createVolunteer({});

    await prisma.createUser({
      username: faker.internet.userName(),
      role: getRandomInt(1, 3)
    });

    await prisma.createTalent({
      talent_name: faker.name.findName(),
      performance_type: performanceType.randomPerformance(),
      address: faker.address.streetAddress(),
      // event: [Event]! @relation(name: "EventTalent")
      website: faker.internet.domainName(),
      min_payment: getRandomInt(50, 500),
      hourly_rate: getRandomInt(10, 20),
      deposit_amount: 100,
      smoking_allowed: faker.random.boolean(),
      under18_allowed: faker.random.boolean(),
      availability_days_of_week: faker.date.weekday(),
      agent_name_first: faker.name.firstName(),
      agent_name_last: faker.name.lastName(),
      agent_phone_number: faker.phone.phoneNumber(),
      number_of_years_performing: getRandomInt(1, 20),
      number_of_previous_performance: getRandomInt(1, 100),
      average_number_of_shows_per_week: getRandomInt(1, 5),
      performance_genre: performanceType.randomPerformance(),
      portfolio_url: faker.internet.domainName(),
      backup_performer_icoe: faker.random.boolean(),
      number_of_performer: getRandomInt(1, 5),
      willing_to_be_own_emcee: faker.random.boolean(),
      takes_requests: faker.random.boolean(),
      setup_themselves: faker.random.boolean(),
      breakdown_themselves: faker.random.boolean(),
      contract_provided: faker.random.boolean(),
      payment_plan_option: faker.random.boolean(),
      min_advance_booking_weeks: faker.random.boolean(),
      insured: faker.random.boolean(),
      provides_all_own_equipment: faker.random.boolean(),
      number_of_outlets_required: getRandomInt(1, 20),
      number_of_special_outlets_required: getRandomInt(1, 5),
      willing_to_meet_prior_to_show: faker.random.boolean()
    });
  }
}

main().catch(e => console.error(e));
// hello
