const { spawn } = require('child_process');
let server;
let exitTimeout;

beforeAll(() => {
  console.log('Test setup starting...');
});

afterAll(done => {
  console.log('Test setup cleanup...');
  if (server) {
    server.kill();
  }
  
  // Clear any existing timeout
  if (exitTimeout) {
    clearTimeout(exitTimeout);
  }
  
  // Call done to signal completion
  done();
});

// Shorter timeout to avoid long hangs
jest.setTimeout(10000);

// Add global error handlers
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});