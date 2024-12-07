module.exports = {
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/test/unit/**/*.test.js'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/test/setup/jest.setup.js']
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/integration/**/*.integration.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/test/setup/integration.setup.js']
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/test/e2e/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/test/setup/e2e.setup.js']
    }
  ],
  testTimeout: 30000
};