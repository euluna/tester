const fetch = require('node-fetch');

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

  test('plant search API returns valid results', async () => {
    const searchTerm = 'mint';
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${config.API_KEY}&q=${searchTerm}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Search API Error:', data);
      console.error('Status:', response.status);
      console.error('API Key used:', config.API_KEY);
    }
    
    expect(response.ok).toBe(true);
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('plant details API returns valid data for free plants', async () => {
    // Guard clause
    if (!config.FREE_PLANT_IDS || config.FREE_PLANT_IDS.length === 0) {
      throw new Error('FREE_PLANT_IDS is not properly configured');
    }

    const plantId = config.FREE_PLANT_IDS[0];
    const response = await fetch(
      `https://perenual.com/api/species/details/${plantId}?key=${config.API_KEY}`
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
  });
}); 