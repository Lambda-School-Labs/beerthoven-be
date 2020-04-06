const { prisma } = require("../generated/prisma-client")

const User = {
  const user = async (parent, _, context) => {
  console.log("User.person.parent: %j", parent)
 
  const person = await context.prisma.user({
    id: parent.id
  }).person();

  // console.log("User.person: %j", person)
  console.log("Is this users ", user)

logger.log('Is this working')


  return user;

}

module.exports = User;