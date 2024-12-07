module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup/jest.setup.js'],
  testTimeout: 30000,
  verbose: true
};