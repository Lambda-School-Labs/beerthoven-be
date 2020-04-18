// @ts-check

// Apollo dependencies
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// We'll need this to convert from callback based functions
const { promisify } = require("util");

// Used to retrieve the public key for JWT validation
const JwksClient = require("jwks-rsa");

// The generated Prisma client
const { prisma } = require("../generated/prisma-client");

// A Winston logger, which will be added to the context
const winston = require("winston");
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});
console.log("Logging level: %s", logger.level);

/**
 * A user object stored in the context
 *
 * @class
 * @param { String } id
 * @param { String } name
 * @param { String } email
 * @param { [String] } groups
 */
exports.User = function User(id, name, email, groups) {
  this.id = id;
  // this.name = name;
  this.email = email;
  this.role = role;
}

/**
 * The context passed to the resolvers
 *
 * @class
 * @param { import('./').User } user
 * @param { import('../generated/prisma-client').Prisma } prisma
 * @param { import('winston').Logger } logger
 */
exports.Context = function Context(user, prisma, logger) {
  this.user = user;
  this.prisma = prisma;
  this.logger = logger;
};

/**
 * This function is called by the JWT verifier, which sends the JWT header and a
 * callback to return the public key used for verifying the JWT signature
 *
 * @param {import('jsonwebtoken').JwtHeader} header
 * @returns {Promise<string>} key
 */
const getKey = async (header) => {
  // Verify the environment variable was set
  if (!("JWKS_URI" in process.env)) {
    throw new Error("Required environment variable 'JWKS_URI' is not set");
  }

  // Creates a JWKS Client
  const { JWKS_URI } = process.env;
  const jwksClient = JwksClient({
    // URL of the JSON Web Key Set JWKS used to verifying the JWT
    jwksUri: JWKS_URI,
  });

  // Promisify the callback based function: https://github.com/auth0/node-jsonwebtoken/issues/111
  const getSigningKey = promisify(jwksClient.getSigningKey);
// console.log(getSigningKey)
  // Get the signing key
  let key;
  try {
    key = await getSigningKey(header.kid);
  } catch (err) {
    logger.error(
      "Error while retrieving signing key (%O) from %O",
      header.kid,
      JWKS_URI
    );
    throw new AuthenticationError("Not authorized");
  }

  logger.debug(
    "Retrieved public key from (%O) with kid (%O): %O",
    JWKS_URI,
    header.kid,
    key
  );

  const publicKey = key.rsaPublicKey;

  return publicKey;
};

/**
 * A function to initialize a new context
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
 *
 * @param  { {req: import('Express').Request, _res: import('Express').Response} } req
 * @return { Promise<import('./').Context> } context
 */
exports.default = async ({ req, _res }) => {
  // Grab the 'Authorization' token from the header
  const authorizationHeader = req.header("Authorization");
  if (
    typeof authorizationHeader !== "string" ||
    authorizationHeader === "null" ||
    authorizationHeader === ""
  ) {
    logger.error(
      "Authorization token missing from request headers: %O",
      req.headers
    );
    throw new AuthenticationError("Not authorized");
  }

  // Strip off the 'Bearer ' part from the header
  const token = authorizationHeader.replace(/^Bearer\s/, "");

  // Decode the JWT so we can get the header
  logger.debug("Decoding token: %s", token);
  let tokenHeader;
  try {
    tokenHeader = jwt.decode(token, { complete: true }).header;
  } catch (err) {
    logger.error("Error while decoding token: %O", token, err);
    throw new AuthenticationError("Not authorized");
  }

  // Get the public key from the OAuth endpoint
  logger.debug("Retrieving public key used for JWT validation");
  const pubKey = await getKey(tokenHeader);

  /** @type jwt.VerifyOptions */
  const jwtVerifyOptions = {
    // Check the issuer to validate the source of the JWT
    issuer: process.env.JWT_ISSUER,
    algorithms: ["RS256"],
  };

  // Verify the JWT
  logger.debug("Verifying and decoding JWT");
  let decodedJWT;
  try {
    decodedJWT = jwt.verify(token, pubKey, jwtVerifyOptions);
  } catch (err) {
    logger.error("Error while verifying token: %O\n%O", token, err);
    throw new AuthenticationError("Not authorized");
  }

  // Create the User using the information from the JWT
  logger.debug("Creating User using decoded JWT: %O", decodedJWT);
  const user = new User(
    (id = decodedJWT.sub),
    // (name = decodedJWT.name),
    (email = decodedJWT.email),
    (role = decodedJWT.role)
  );
// console.log("id as email", user.id)
// console.log("email", user.email)
// console.log("role", user.role)
  // Don't let anyone past this point if they aren't authenticated
  if (typeof user === "undefined" || user == null) {
    logger.error("Unable to authenticate user: %O", req.header);
    throw new AuthenticationError("Not authorized");
  }

  logger.debug("Current user: %O", user);

  // Pack the user, Prisma client and Winston logger into the context
  return { user, prisma, logger, authorizationHeader, tokenHeader }; // can also pass authorizationHeader
};














// // @ts-check

// // Apollo dependencies
// const { AuthenticationError } = require('apollo-server');
// const jwt = require('jsonwebtoken');

// // We'll need this to convert from callback based functions
// const { promisify } = require('util');

// // Used to retrieve the public key for JWT validation
// const JwksClient = require('jwks-rsa');

// // The generated Prisma client
// const winston = require('winston');
// const { prisma } = require('../generated/prisma-client');

// // A Winston logger, which will be added to the context
// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: winston.format.combine(
//     winston.format.splat(),
//     winston.format.simple(),
//   ),
//   transports: [new winston.transports.Console()],
// });
// console.log('Logging level: %s', logger.level);


// /**
//  * The context passed to the resolvers
//  * @typedef {Object} ApolloContext
//  * @property {import('../generated/prisma-client').Prisma} prisma The generated Prisma client
//  * @property {User} user The currently authenticated user
//  * @property {import('winston').Logger} logger A logger
//  */

// /**
//   * A user object stored in the context
//  *
//  * @class
//  * @param { String } id
//  * @param { String } name
//  * @param { String } email
//  * @param { [String] } groups
//  */
// // function User(id, email, role) {
// //   this.id = id;
// //   // this.name = name;
// //   this.email = email;
// //   this.role = role;
// // }

// exports.User = function User(id, name, email, groups) {
//   this.id = id;
//   this.name = name;
//   this.email = email;
//   this.groups = groups;
// }

// /**
//  * Options used for verifying the JWT
//  * @type jwt.VerifyOptions
//  *  * The context passed to the resolvers
//  *
//  * @class
//  * @param { import('./').User } user
//  * @param { import('../generated/prisma-client').Prisma } prisma
//  * @param { import('winston').Logger } logger
//  */
// // const jwtVerifyOptions = {
// //   // Check the issuer to validate the source of the JWT
// //   issuer: process.env.JWT_ISSUER,
// //   algorithms: ['RS256'],
// // };

// exports.Context = function Context(user, prisma, logger) {
//   this.user = user;
//   this.prisma = prisma;
//   this.logger = logger;
// };

// // Verify the environment variable was set
// // if (!('JWKS_URI' in process.env)) {
// //   throw new Error("Required environment variable 'JWKS_URI' is not set");
// // }

// // Creates a JWKS Client
// // const { JWKS_URI } = process.env;
// // const jwksClient = JwksClient({
// //   // URL of the JSON Web Key Set JWKS used to verifying the JWT
// //   jwksUri: JWKS_URI,
// // });

// // This function is called by the JWT verifier, which sends the JWT header and a
// // callback to return the public key used for verifying the JWT signature
// /**
//  *
//  * @param {import('jsonwebtoken').JwtHeader} header
//  * @returns {Promise<string>} key
//  */
// const getKey = async header => {
//   // Promisify the callback based function: https://github.com/auth0/node-jsonwebtoken/issues/111
//   const getSigningKey = promisify(jwksClient.getSigningKey);
// // console.log(getSigningKey)
//   // Get the signing key
//   let key;
//   try {
//     key = await getSigningKey(header.kid);
//   } catch (err) {
//     logger.error(
//       'Error while retrieving signing key (%O) from %O',
//       header.kid,
//       JWKS_URI,
//     );
//     throw new AuthenticationError('Not authorized');
//   } 

//   logger.debug("Retrieved public key from (%O) with kid (%O): %O", JWKS_URI, header.kid, key)

//   const publicKey = key.rsaPublicKey;

//   return publicKey;
// };

// /**
//  * Async factory for the context
//  *
//  * @param  { {req: import('Express').Request} } req
//  * @return { Promise<ApolloContext> } context
//  */
// const context = async ({ req }) => {
//   // console.log(req.header('Authorization'))
//   // Grab the 'Authorization' token from the header
//   const authorizationHeader = req.header('Authorization');

//   if (
//     typeof authorizationHeader !== 'string' ||
//     authorizationHeader === 'null' ||
//     authorizationHeader === ''
//   ) {
//     logger.error(
//       'Authorization token missing from request headers: %O',
//       req.headers,
//     );
//     throw new AuthenticationError('Not authorized');
//   }

//   // Strip off the 'Bearer ' part from the header
//   const token = authorizationHeader.replace(/^Bearer\s/, '');

//   // Decode the JWT so we can get the header
//   logger.debug('Decoding token: %s', token);
//   let tokenHeader;
//   try {
//     tokenHeader = jwt.decode(token, { complete: true }).header;
//   } catch (err) {
//     logger.error('Error while decoding token: %O', token, err);
//     throw new AuthenticationError('Not authorized');
//   }

//   // Get the public key from the OAuth endpoint
//   logger.debug('Retrieving public key used for JWT validation');
//   const pubKey = await getKey(tokenHeader);

//   // Verify the JWT
//   logger.debug('Verifying and decoding JWT');
//   let decodedJWT;
//   try {
//     decodedJWT = jwt.verify(token, pubKey, jwtVerifyOptions);
//   } catch (err) {
//     logger.error('Error while verifying token: %O\n%O', token, err);
//     throw new AuthenticationError('Not authorized');
//   }

//   // Create the User using the information from the JWT
//   logger.debug('Creating User using decoded JWT: %O', decodedJWT);
//   const user = new User(
//     (id = decodedJWT.sub),
//     // (name = decodedJWT.name),
//     (email = decodedJWT.email),
//     (role = decodedJWT.role)
//   );
// // console.log("id as email", user.id)
// // console.log("email", user.email)
// // console.log("role", user.role)
//   // Don't let anyone past this point if they aren't authenticated
//   if (typeof user === 'undefined' || user == null) {
//     logger.error('Unable to authenticate user: %O', req.header);
//     throw new AuthenticationError('Not authorized');
//   }

//   logger.debug('Current user: %O', user);

//   // Pack the user, Prisma client and Winston logger into the context
//   return { user, prisma, logger, authorizationHeader, tokenHeader }; // can also pass authorizationHeader
// };

// module.exports = context;
