module.exports = async (_, args, { prisma }, info) => {
  const errors = [];

  function validateNewUser(user) {
    !user.email && errors.push({ email: "required" });

    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    Object.keys(user).map(x => {
      if (x === "email") {
        // validate email pattern
        if (condition) {
          !emailExpression.test(String(user[x]).toLowerCase()) &&
            errors.push({ error: "email not in proper format" });
        }
      }
    });
  }

  validateNewUser(args.data);

  // Does email exist
  if (!errors.length) {
    await prisma.$exists.user({ email: args.data.email }).then(email => {
      email && errors.push({ email: "Email already taken" });
    });
  }

  // OK we are probably safe to move on
  errors.length < 1 ?
};
