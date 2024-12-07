require('dotenv').config();

try {
  require('@testing-library/jest-dom');
} catch (e) {
  console.log('jest-dom not required for this test suite');
}

try {
  global.fetch = require('jest-fetch-mock');
} catch (e) {
  console.log('fetch-mock not required for this test suite');
}

// Set up DOM environment if needed
try {
  document.body.innerHTML = `
    <div id="root"></div>
  `;
} catch (e) {
  console.log('DOM setup not required for this test suite');
}

// Reset mocks before each test
beforeEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks();
  }
  if (global.fetch && typeof global.fetch.resetMocks === 'function') {
    global.fetch.resetMocks();
  }
});

// Set longer timeout for integration tests
jest.setTimeout(60000);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 