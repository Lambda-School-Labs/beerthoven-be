// @ts-check

// A Winston logger, which will be added to the mock context
// Note: This is nice to have while running tests, as you can see logging from the application code
const winston = require("winston");

// We'll pass it a real Prisma client, which will be mocked up as needed during testing
const { prisma } = require("../generated/prisma-client");

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

// Create a default authenticated user
const user = new User("test-id", "Test User", "test@example.com", [
  "test-group",
]);

// Create the mock context
exports.mockContext = new Context(user, prisma, logger);
