const getUserInfo = (user) => {
  if (!user || !user.role.includes("admin"))
    throw new Error("Sorry, you are not authorized to do that.");
};

module.exports = getUserInfo;
