import{test, expect} from '@playwright/test';

test('Calendar validations', async({page})=>
{

    // testing changes for PUSH
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    // or use .react-calendar__tile()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    // xpath -> //abbr[text()='15']
    // "+date+" = 15
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input");

    for (let i=0; i<expectedList.length; i++) 
    {
        const value = await inputs.nth(i).inputValue();
        console.log(value);
        await expect(value).toEqual(expectedList[i]);
    }

});