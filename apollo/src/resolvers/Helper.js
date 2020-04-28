// @ts-check

  /**
   * @param {Object} user - grab user object 
   * @param {Array} user.role[] - loop to check if user is admin
   * @returns Error message
   */

// If user is not admin throw error
const getUserInfo = (user) => {
  if (!user || !user.role.includes("admin"))
    throw new Error("Sorry, you are not authorized to do that.");
};

module.exports = getUserInfo;
