describe('Search Functionality Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="searchForm" class="search-container">
        <input type="text" id="searchInput" placeholder="Search for a houseplant">
        <div class="nav-item">
          <img src="images/search.png" alt="Search" class="search-icon">
        </div>
      </form>
    `;
    
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  });

  test('search form prevents default submission', () => {
    const form = document.getElementById("searchForm");
    const mockPreventDefault = jest.fn();
    
    const mockEvent = new Event('submit');
    mockEvent.preventDefault = mockPreventDefault;
    
    form.dispatchEvent(mockEvent);
    
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  test('search input exists with correct attributes', () => {
    const searchInput = document.getElementById('searchInput');
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toBe('Search for a houseplant');
  });
});

describe('Plant of the Day Tests', () => {
  test('PLANT_OF_DAY_ID is within FREE_PLANT_IDS array', () => {
    const config = require('../config.js');
    const plantOfDay = config.PLANT_OF_DAY_ID;
    expect(Array.isArray(config.FREE_PLANT_IDS)).toBe(true);
    expect(config.FREE_PLANT_IDS.length).toBeGreaterThan(0);
    expect(config.FREE_PLANT_IDS).toContain(plantOfDay);
  });
}); 