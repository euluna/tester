module.exports = {
  testMatch: ['**/*.integration.test.js'],  // looks for files ending in .integration.test.js
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup/integration.setup.js']
}; 