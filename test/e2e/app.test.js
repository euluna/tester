describe('Basic Tests', () => {
  beforeAll(() => {
    console.log('Test suite starting...');
  });

  afterAll(done => {
    console.log('Test suite cleanup...');
    done();
  });

  test('simple test', () => {
    console.log('Running simple test');
    expect(true).toBe(true);
  });

  test('another simple test', () => {
    console.log('Running another test');
    expect(1 + 1).toBe(2);
  });
}); 