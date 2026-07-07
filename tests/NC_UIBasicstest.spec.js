import { test, expect } from '@playwright/test';

// load browser
test('Browser context first Playwright', async({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const passWord = page.locator("[type='password']");
    const signIn = page.locator("[value='Sign In']");
    const errMsg = page.locator("[style*='block']");

     // Navigate te url
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await console.log(await page.title());

    // Invalid username and password and validate error message
    await userName.fill("abc");
    await passWord.fill("abc");
    await signIn.click();
    console.log(await errMsg.textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // login. get and display product list
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await signIn.click();

    console.log(await page.locator(".card-title a").first().textContent());
    const products = await page.locator(".card-title a").allTextContents();

    // Another way:
    // console.log(await page.locator("h4 a").first().textContent());
    // const products = await page.locator("h4 a").allTextContents();

    console.log(products);
});

test('Page Playwright Test', async({page}) => 
{
    // Go to google.com, get and check title
    await page.goto("https://www.google.com/");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');
});

test('UI Controls Test', async({page}) => {
    const userName = page.locator("#username");
    const passWord = page.locator("[name='password']");
    const signIn = page.locator("[type='submit']");
    
    // select 'consult' from dropdown
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("select.form-control").selectOption('consult');
       
    // select 'user' radio button
    await page.locator(".radiotextsty").last().click();
    //use isChecked -> 1st way to check and print out boolean value if radio button is checked
    console.log(await page.locator(".radiotextsty").last().isChecked());
    //use toBeChecked -> assertion use expect
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    // click 'ok' at pop up
    await page.locator("#okayBtn").click();

    // Check 'I agree' checkbox
    await page.locator("#terms").click();
    // use toBeChecked to verify if checkbox is selected
    await expect(page.locator("#terms")).toBeChecked();
    // use isChecked and toBeTruthy to verify if checkbox is selected
    expect(await page.locator("#terms").isChecked()).toBeTruthy();
    // Uncheck 'I agree' checkbox
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // check if 'documents-request' link has class .blinkingText 
    expect(await page.locator("[href*='documents-request']")).toHaveAttribute('class','blinkingText');

    // await page.pause();

});


test('Child window handling', async({browser}) =>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");
   console.log(await page.title());
   
   const[newPage] = await Promise.all ([
    context.waitForEvent('page'),
    documentLink.click(),
   ]);

   const newTitle = await newPage.title();
   console.log(newTitle);

   // Get the red message and take out the email address
   const redText = await newPage.locator(".red").textContent();
   console.log(redText);
   const arrayText = redText.split("@");
   console.log(arrayText);
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").inputValue());
   // await page.pause();

});