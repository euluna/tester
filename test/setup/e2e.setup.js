const { exec } = require('child_process');

beforeAll(async () => {
  // Start local server
  exec('npx http-server -p 8080');
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));
});

afterAll(async () => {
  // Cleanup server process
  exec('pkill -f http-server');
}); 