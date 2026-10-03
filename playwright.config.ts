import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', timeout: 45000, fullyParallel: false, workers: 1,
  reporter: [['list']], use: {baseURL:'http://127.0.0.1:3001',channel:'chrome',headless:true, screenshot:'only-on-failure'},
  webServer: {command:'node scripts/e2e-server.mjs',url:'http://127.0.0.1:3001/fr',reuseExistingServer:false,timeout:30000},
});
