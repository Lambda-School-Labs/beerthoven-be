module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/__tests__/**",
  ],
  projects: ["apollo"],
};