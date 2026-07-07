const {test, expect} = require('@playwright/test');

// My practice
test('Client App login', async ({page}) => 
{
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "abcefg@yopmail.com";
   
    await page.goto("https://rahulshettyacademy.com/client");
   // console.log(await page.title());
   // await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill(email);
   // await page.locator("[type='password']").fill("Abcefg123$$$");
    await page.locator("#userPassword").fill("Abcefg123$$$");
   // await page.locator("#login").click();
    await page.locator("[value='Login']").click();
   // This waits for network calls to complete
    await page.waitForLoadState('networkidle');
   // This only waits for 1 web element is loaded, so add first().
   // If want to wait for the last element use last().
   // discuss at lecture #15 - page.waitForLoadState('networkidle') is not enough, have to wait for the first item comes up
   await page.locator(".card-body b").first().waitFor();
   // allTextContents not support auto-wait
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i=0; i<count; i++)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart
            // console.log(await products.nth(i).textContent());
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }
    
    await page.locator("[routerlink*='cart']").click();
    // Wait for until the div and li are shown up on the page, doing this because isVisible is not auto-waiting
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
      const text = await dropdown.locator("button").nth(i).textContent();
       // or (text.trim() === 'India'))
       // or (text.includes("India")) if there is no more India
       if (text === " India")
       {
         await dropdown.locator("button").nth(i).click();
         break;
       }

    }
    
    // this one and above variables
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 label").last().textContent();
    
    
    const cleanOrderId = orderId.split('|')[1].trim(); 
    console.log(cleanOrderId);

    await page.locator("button:has-text('  ORDERS')").click();
    // wait here for whole body to load
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const rowsCount = await rows.count();
    for(let i=0; i< rowsCount; ++i)
    {
       // // Wait for at the body already, no need to wait here -> await rows.nth(i).waitFor();
        const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)){
        // await rows.nth(i).locator("button").first().click();
        await rows.nth(i).locator("button:has-text('View')").click();
        break;
       }
         
    }

    const dummy = await page.locator(".col-text").textContent();
    await expect(orderId.includes(dummy)).toBeTruthy();
    console.log(dummy);
    // await page.pause();
   
});
