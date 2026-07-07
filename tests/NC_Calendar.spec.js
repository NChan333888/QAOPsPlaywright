const {test,expect} = require("@playwright/test");
test("NC Calendar validations",async({browser})=>
{
    const date ="2027-06-17";
    const month = "06"
    const day = "17"
    const year ="2027";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    const topDeals = await page.getByText("Top Deals");

    const[newPage] = await Promise.all ([
        context.waitForEvent('page'),
        topDeals.click(),
    ]);

    await newPage.locator(".react-date-picker__inputGroup").click();
    await newPage.locator(".react-calendar__navigation__label__labelText").click();
    await newPage.locator(".react-calendar__navigation__label__labelText").click();
    await newPage.getByText("2027").click();
    await newPage.getByText("June").click();
    await newPage.getByText("17").click();
    const deliveryDate = await newPage.locator("[name='date']").inputValue();
    console.log(deliveryDate);
    console.log(date);
    await expect(date).toBe(deliveryDate);
    const splitDate = deliveryDate.split('-');
    console.log(splitDate);
    await expect(splitDate[0]).toBe(year);
    await expect(splitDate[1]).toBe(month);
    await expect(splitDate[2]).toBe(day);

});