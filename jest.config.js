module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/test/unit/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test/setup/jest.setup.js']
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/integration/**/*.integration.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test/setup/integration.setup.js']
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/test/e2e/**/*.e2e.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test/setup/e2e.setup.js']
    }
  ]
};