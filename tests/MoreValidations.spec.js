import { test, expect } from "@playwright/test";

// test.describe.configure({ mode: 'parallel' });
// test.describe.configure({ mode: 'serial' });

test("@Web Pop up validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://www.google.com/");
  // await page.goBack();
  // await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // await page.pause();

  // dialog
  // Important - Register the dialog listener before the action that triggers the popup
  // if accept
  page.on("dialog", (dialog) => dialog.accept());
  // if dismiss
  // await page.on('dialog', dialog => dialog.dismiss() );
  await page.locator("#confirmbtn").click();

  // Hover
  await page.locator("#mousehover").hover();
  await page.getByText("Top").click();
  await page.locator("#mousehover").hover();
  await page.getByText("Reload").click();

  // iframes
  const framesPage = page.frameLocator("#courses-iframe");
  // To filter invisible elements
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();

  const textCheck = await framesPage.locator(".text h2").textContent();
  const subscriber = textCheck.split(" ")[1];
  console.log(subscriber);
  // await page.pause();
});

test("Screenshot & Visual Comparision", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  // screenshot at locator level
  await page.locator("#displayed-text").screenshot({ path: "partialScreenshot.png" });
  await page.locator("#hide-textbox").click();
  // screenshot of whole page
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

// screenshot - store -> screenshot -> visual comparision before and after (alignment)
// when no snapshot in first run, playwright will create a screenshot
test.skip ("visual", async ({ page }) => {
  // await page.goto("https://google.com/");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  expect(await page.screenshot()).toMatchSnapshot("Landing.png");
});
