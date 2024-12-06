require('@testing-library/jest-dom');
global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  jest.clearAllMocks();
  fetch.resetMocks();
}); 