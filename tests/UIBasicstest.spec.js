const {test, expect} = require('@playwright/test');

test('@Web Browser Context First playwright test', async ({browser}) => 
{
    // Chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    // this will stop the .css call to reach browser
    // await page.route('**/*.css', route=> route.abort());
    // image file
    // await page.route('**/*.{jpg, png, jpeg}', route=> route.abort());
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request=>console.log(request.url()));
    page.on('response', response=>console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // css   type(depreciated), use 'fill'
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2")
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // type - fill
    // wipe off exisiting value
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    // Way #1 - first(). -> 1st element
    console.log(await cardTitles.first().textContent());
    // Way #2 - Total 4 elements in the array, use index 
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    // await page.pause();

});

test('Page playwright test', async ({page}) => 
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('@Web UI Controls test', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    // Select a value from dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    
    // Select last radio button -> page.locator(".radiotextsty").nth(1).click();
    await page.locator(".radiotextsty").last().click();
    
    // click will wait until thing not showing up after 30 sec
    await page.locator("#okayBtn").click();

    // 1st way to check and print out if radio button is selected with boolean value return 
    console.log(await page.locator(".radiotextsty").last().isChecked());
    // 2nd way use assertion to check if radio button is selected with no boolean value return 
    // await is performed on action -> toBeChecked
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    // Select checkbox
    await page.locator("#terms").click();
    // assertion to check if checkbx checked
    // await is performed on action -> toBeChecked
    await expect(page.locator("#terms")).toBeChecked();
    // await is performed on isChecked, toBeTruthy only assertion
    expect( await page.locator("#terms").isChecked()).toBeTruthy();

    await page.locator("#terms").uncheck();
    // assertion to check if checkbox unchecked
    // await is performed on isChecked, toBeFalsy only assertion
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");
 
    // await page.pause();
});

test('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
       context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
       documentLink.click(), 
    ]);  // new page is opened
    
    // newPage -> This is child window
     const text = await newPage.locator(".red").textContent();
     const arrayText = text.split("@");
     const domain = arrayText[1].split(" ")[0]
     console.log(text);
     console.log(domain);
    await page.locator("#username").fill(domain);
    // or await userName.fill(domain);
    // await page.pause();

    // Reads text inside tags, visible in DOM. Usually not for inputs.
    // console.log(await page.locator("#username").textContent());

    // Reads the value of form fields (<input>, <textarea>)
    console.log(await page.locator("#username").inputValue());
    // await page.pause();
});