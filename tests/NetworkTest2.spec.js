const{test, expect, request} = require('@playwright/test');

test('Security test request intercept', async({page}) => 
{

    //login and reach orders page
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "abcefg@yopmail.com";
   
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Abcefg123$$$");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    // use wild card * since id keeps on changing 
    // Once hit this url, continue with modified stuff before the browser receive it, not the original request stuff
    // continue() is used to intercept request call before the code reach the server
    // From https://playwright.dev/docs/api/class-route -> Continue() Sends route's request to the network with optional overrides.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a10962117ee3e78ba9209n8'}))
    await page.locator("button:has-text('View')").first().click();
    // await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    await page.pause();
});