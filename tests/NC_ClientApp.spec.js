import {test, expect} from '@playwright/test';

test('Playwright end to end test', async({page}) => {

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const products = page.locator(".card-body");
    const coat = 'ZARA COAT 3';
    const useremail = "abcefg@yopmail.com"; 

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await email.fill("abcefg@yopmail.com");
    await password.fill("Abcefg123$$$");
    await loginBtn.click();

    await page.waitForLoadState("networkidle");
    await products.first().waitFor();
    // or await page.locator(".card-body").first().waitFor({state: 'visible'});

    // description of the product
    const text = await products.locator("b").allTextContents();
    console.log(text);

    const count = await products.locator("b").count();
    console.log(count);

    for (let i=0; i< count; i++) {

        if (await products.nth(i).locator("b").textContent() === coat) {
            await products.nth(i).locator("button").last().click()
            // or await products.nth(i).locator("button:has-text(' Add To Cart')").click();
            break;
        }
     
    }

    await page.locator("[routerlink*='cart']").click();
    await page.waitForLoadState("networkidle");

    // Method #1 - from lecture
    await page.locator("div li").first().waitFor();

    // Method #2 - from me  
    // await page.locator(".cartSection").first().waitFor();

    // Method #1 - from lecture
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // console.log(bool);
    // await expect(bool).toBeTruthy(); 
    // await expect(page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();
    // Method #2 - from me
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
        
    // Method #1 - from me
    // await page.locator("button:has-text('Checkout')").click();
    // Method #2 - from lecture
    await page.locator("text=Checkout").click();

    // Enter "ind" and select "India"
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 100 });
    await page.locator(".ta-results button").first().waitFor();
    const dropdown = await page.locator(".ta-results");
    const country = await dropdown.allTextContents();
    console.log(country);
    const total= await dropdown.locator("button").count();
    console.log(total);

    for(let i=0; i<total; i++) {

    const text = await dropdown.locator("button").nth(i).textContent();

     if (text.trim() === 'India') {
        await dropdown.locator("button").nth(i).click();
        break;
     }

    }

   
    // Method #1 - from lecture .toHaveText for assertion
    // const a = await page.locator(".user__name [type='text']").first().textContent();
    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(useremail);
    // Method #2 - from me 
    // const a = await page.locator(".user__name [type='text']").nth(1).textContent();
    await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText(useremail);
  
    // Method #1 - from me
    // await page.locator("a:has-text('Place Order ')").click();
    await page.locator(".action__submit").click();

    // Check confirmation and get orderId
    // Method 1 - from lecture
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderId = await page.locator(".em-spacer-1 label").last().textContent();
    // This is from me
    // const cleanOrderId = orderId.split('|')[1].trim(); 
    // console.log(cleanOrderId);

    // Method #2 - from me
    await expect(page.locator("h1")).toContainText("Thankyou");
    const orderId = await page.locator("td label").last().textContent();

    // Go to Order history page
    await page.locator("button:has-text('ORDERS')").click();

    await page.waitForLoadState('networkidle');
    await page.locator("tbody").waitFor();
   // await page.locator("tbody tr").first().waitFor();

    const totalOrder = await page.locator("tbody tr").count();
    console.log(totalOrder);

    const row = await page.locator("tbody tr");

    for(let i=0; i<totalOrder; i++){

        const tableOrderId = await row.nth(i).locator("th").textContent();
        console.log(tableOrderId);

      if (orderId.includes(tableOrderId)) {
            await row.nth(i).locator("button:has-text('View')").click();
              break;
         }
          
    }
  
    // Verify if orderId is correct on View order page
    
    const viewOrderId = await page.locator(".col-text").textContent();
    console.log(viewOrderId);
    expect(orderId.includes(viewOrderId)).toBeTruthy();
    
    // await page.pause();

});