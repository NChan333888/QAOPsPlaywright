// @ts-check
// import { defineConfig, devices } from '@playwright/test';
const {devices} = require('@playwright/test');


// export default defineConfig({
//  workers: 1,
// });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
   retries : 1,       // this is global level for retry times
   workers: 3,
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
  projects:   // lecture #91
    [
      {
        name: 'safari',
        use: {
          browserName: 'webkit',  // lecture #91 - Safari
          // no header
          // headless: true

          // with header, no need to do 'npx playwright test --headed'
          // only need 'npx playwright test'
          headless: true,   // lecture #91 - Head mode
          screenshot: 'off',
          trace: 'on', // off, on, retain-on-failure
          // ...devices['iPhone 11'],

        }
      },

    {
        name: 'chrome',
        use: {
          browserName: 'chromium',  // lecture #91 - chrome
          // no header
          // headless: true

          // with header, no need to do 'npx playwright test --headed'
          // only need 'npx playwright test'
          headless: false,   // lecture #91 - Head mode
          screenshot: 'on',
          trace: 'retain-on-failure', // off, on
        }
      }
    

    ],


});
module.exports = config