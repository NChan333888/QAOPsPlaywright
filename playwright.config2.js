// playwright.config1.js
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // retries : 1,       // this is global level for retry times
  workers : 3,
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  // workers: 1,

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'retain-on-failure',
        //...devices['iPhone 11'],
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure', // show video on fail
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure', // show log on fail
        // ...devices['Galaxy S24'],
        // viewport : {width:720, height:720} // left this on for lecture #93 to make program fail
      },
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    }

  ]

});