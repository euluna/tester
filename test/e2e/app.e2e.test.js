const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ],
    ignoreHTTPSErrors: true
  });
  page = await browser.newPage();
}, 30000);

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('E2E Tests', () => {
  test('search functionality works end-to-end', async () => {
    await page.goto('http://localhost:5500');
    await page.waitForSelector('#searchInput', { timeout: 5000 });
    await page.type('#searchInput', 'rose');
    await page.waitForSelector('.search-icon');
    await page.click('.search-icon');
    // Add your assertions here
  });

  test('plant of the day navigation works', async () => {
    await page.goto('http://localhost:5500');
    // Your existing test logic, but using Playwright's API
  });

  test('should load the page', async () => {
    const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:5500';
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
    // ... rest of test
  });
}); 