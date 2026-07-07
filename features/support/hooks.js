// Synchronous
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

// Before, before every scenario
// BeforeAll, before all scenarios, only run once before all 5 scenarios
Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  // world constructor
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot1.png'});
  }
});


After(function () {
console.log("I am the last to execute");

});
