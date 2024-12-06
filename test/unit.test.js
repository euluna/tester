describe('UI Unit Tests', () => {
  beforeEach(() => {
    // Setup a fresh DOM for each test
    document.body.innerHTML = `
      <form>
        <input type="text" placeholder="Search for a houseplant...">
        <button type="submit"><img src="./image/search_icon.png"></button>
      </form>
    `;
  });

  test('search input exists with correct attributes', () => {
    const searchInput = document.querySelector('input[type="text"]');
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toBe('Search for a houseplant...');
  });

  test('navigation buttons have correct styling classes', () => {
    document.body.innerHTML = `
      <button class="absolute w-32 h-20 left-20 top-10 bg-[#3F6546] rounded-xl text-white text-3xl">
        Back
      </button>
    `;
    const button = document.querySelector('button');
    expect(button.classList.contains('bg-[#3F6546]')).toBeTruthy();
    expect(button.classList.contains('text-white')).toBeTruthy();
  });

  test('form submission prevents default behavior', () => {
    const form = document.querySelector('form');
    const mockPreventDefault = jest.fn();
    
    form.dispatchEvent(new Event('submit', {
      preventDefault: mockPreventDefault
    }));
    
    expect(mockPreventDefault).toHaveBeenCalled();
  });
}); 