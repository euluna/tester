const nodeFetch = require('node-fetch');
const { AbortController } = require('node-abort-controller');

describe('API Integration Tests', () => {
  const config = require('../../config.js');

  beforeAll(() => {
    // Verify config is loaded properly
    expect(config).toBeDefined();
    expect(config.API_KEY).toBeDefined();
    
    // Test PLANT_OF_DAY_ID getter
    const plantOfDayId = config.PLANT_OF_DAY_ID;
    expect(plantOfDayId).toBeDefined();
    expect(typeof plantOfDayId).toBe('number');
    expect(config.FREE_PLANT_IDS).toContain(plantOfDayId);

    // Continue with other tests
    expect(config.FREE_PLANT_IDS).toBeDefined();
    expect(Array.isArray(config.FREE_PLANT_IDS)).toBe(true);
    expect(config.FREE_PLANT_IDS.length).toBeGreaterThan(0);
  });

  let activeControllers = [];

  beforeEach(() => {
    activeControllers = [];
    global.fetch = jest.fn(async (url, options = {}) => {
      const controller = new AbortController();
      activeControllers.push(controller);
      try {
        const response = await nodeFetch(url, {
          ...options,
          signal: controller.signal
        });
        return response;
      } catch (error) {
        if (error.name === 'AbortError') {
          // Ignore abort errors
          return;
        }
        throw error;
      }
    });
  });

  afterEach(() => {
    return new Promise(resolve => {
      // Abort all active controllers
      activeControllers.forEach(controller => {
        try {
          controller.abort();
        } catch (e) {
          // Ignore abort errors
        }
      });
      activeControllers = [];
      global.fetch.mockClear();
      delete global.fetch;
      // Give time for any pending connections to close
      setTimeout(resolve, 100);
    });
  });

  afterAll(() => {
    // Add a small delay to ensure connections are closed
    return new Promise(resolve => setTimeout(resolve, 500));
  });

  test('plant search API returns valid results', async () => {
    const searchTerm = 'mint';
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const maxRetries = 3;
    
    for (let i = 0; i < maxRetries; i++) {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=${config.API_KEY}&q=${searchTerm}`
      );
      const data = await response.json();
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        if (i < maxRetries - 1) {
          await wait(retryAfter * 1000);
          continue;
        }
      }
      
      expect(response.ok).toBe(true);
      expect(data.data).toBeDefined();
      expect(Array.isArray(data.data)).toBe(true);
      break;
    }
  });

  test('plant details API returns valid data for free plants', async () => {
    // Guard clause
    if (!config.FREE_PLANT_IDS || config.FREE_PLANT_IDS.length === 0) {
      throw new Error('FREE_PLANT_IDS is not properly configured');
    }

    const controller = new AbortController();
    const plantId = config.FREE_PLANT_IDS[0];
    
    try {
      const response = await fetch(
        `https://perenual.com/api/species/details/${plantId}?key=${config.API_KEY}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Details API Error:', data);
        console.error('Status:', response.status);
        console.error('Plant ID:', plantId);
        console.error('API Key used:', config.API_KEY);
      }
      
      expect(response.ok).toBe(true);
      expect(data.id).toBe(plantId);
      expect(data.common_name).toBeDefined();
    } finally {
      controller.abort(); // Ensure the request is aborted
    }
  });
}); 