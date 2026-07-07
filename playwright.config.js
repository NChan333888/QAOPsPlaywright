// @ts-check
import { defineConfig, devices } from '@playwright/test';
// import { retries } from './playwright.config1';

export default defineConfig({
  workers: 1,
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 1,
  // component and every step in Playwright
  // maximum time one test can run for 30 sec
  timeout: 30 * 1000,
  expect: {
    // timeout for assertion validation
    // maximum time for
    //  assertion is 5 sec
    timeout: 5000,
  },

  reporter: 'html',
  
   use: {
    browserName: 'chromium',
    // no header
    // headless: true

    // with header, no need to do 'npx playwright test --headed'
    // only need 'npx playwright test'
    headless: true,
    screenshot: 'on',
    trace: 'on', // off, on, retain-on-failure
  
  },

 
});
module.exports = config