// Login UI -> collect all storage setting into .json (we can inject .json file directly into browser)
// test browser -> .json (add to cart is happening), cart, order confirmation, order details, order history

const {test, expect} = require('@playwright/test');
const email = "abcefg@yopmail.com";
let webContext;

// put in {} for browser to indicate fixture
test.beforeAll( async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");  
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Abcefg123$$$");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    // cookies should at browser level 
    // .storageState() is used to save or load the browser’s authentication/session data such as:
    // cookies, localStorage, sessionStorage (limited support depending on context)
    await context.storageState({path: 'state.json'});
    // when this browser is opened, it will behave like a normal logged in user
    // since this is injected with all .json setting
    // All new tests no need to log in, the newContext setting is injected with .json
    webContext = await browser.newContext({storageState: 'state.json'});

});

// My practice
// The page is created dymatically, not passed in as fixture, so only ()
test('Client App login', async () => 
{
    const productName = 'ZARA COAT 3';
    // Dymatically created page
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
     
   
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

test('@API Test case 2', async () => 
{
    const productName = 'ZARA COAT 3';
    // Dymatically created page
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState("networkidle");
    const products = page.locator(".card-body");
     
   
   // allTextContents not support auto-wait
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});