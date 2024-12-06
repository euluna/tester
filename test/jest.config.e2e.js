module.exports = {
  testMatch: ['**/*.e2e.test.js'],  // looks for files ending in .e2e.test.js
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup/e2e.setup.js']
}; 