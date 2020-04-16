// @ts-check

// A Winston logger, which will be added to the mock context
// Note: This is nice to have while running tests, as you can see logging from the application code
const winston = require("winston");

const { User, Context } = require("../context");

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

// Generate a mock Prisma client to embed in the context mock
//   Yes, it's odd to declare the wrong type, then ignore the warning.
//   This is done because Prisma generates the JS client on the fly, which
//   means Jest mocking can't work properly, so we fake it.
/** @type { import('../generated/prisma-client').prisma } */
// @ts-ignore
const prisma = new Object();

// Create a default authenticated user
const user = new User("test-id", "Test User", "test@example.com", [
  "test-group",
]);

// Create the mock context
exports.mockContext = new Context(user, prisma, logger);
