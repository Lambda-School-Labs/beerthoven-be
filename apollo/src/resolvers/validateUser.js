
const prisma  = require("../generated/prisma-client")

module.exports = async (parent, args, prisma, info) => {


  console.log(parent, args, prisma, info)
  // const errors = [];

  // function validateNewUser(user) {
  //   !user.email && errors.push({ email: "required" });

  //   const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   Object.keys(user).map(x => {
  //     if (x === "email") {
  //       // validate email pattern
  //         !emailExpression.test(String(user[x]).toLowerCase()) &&
  //           errors.push({ error: "email not in proper format" });
  //     }
  //   });
  // }

  // validateNewUser(args);

  // // Does email exist
  // if (!errors.length) {
  //   await context.prisma.$exists.user({ email: args.data.email }).then(email => {
  //     email && errors.push({ email: "Email already taken" });
  //   });
  // }

  // // OK we are probably safe to move on
  // errors.length < 1 ? prisma : errors;
};
