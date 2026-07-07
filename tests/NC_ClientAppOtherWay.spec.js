import{test, expect} from '@playwright/test';
import { toNamespacedPath } from 'path';

test('@Webst Client App login', async({page}) => {

await page.goto("https://rahulshettyacademy.com/client");
await page.getByPlaceholder("email@example.com").fill("abcefg@yopmail.com");
await page.getByPlaceholder("enter your passsword").fill("Abcefg123$$$");
await page.getByRole("button",{name:'Login'} ).click();
await page.waitForLoadState("networkidle");
await page.locator(".card-body").first().waitFor();
await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button", {name:'Add To Cart'}).click();
// from lecture
await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
// from lecture
await page.locator("div li").first().waitFor();
await expect(page.getByText('ZARA COAT 3')).toBeVisible();
await page.getByRole("button", {name:'Checkout'}).click();
await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay:100});
// from lecture
await page.getByRole("button", {name:'India'}).nth(1).click();
// from Chagpt - not working yet
// const indiaButton = await aa.locator('button.ta-item').filter({ hasText: /^India$/ });
// await indiaButton.click();
await page.getByText("Place Order ").click();
await expect(page.getByText( "Thankyou for the order.")).toBeVisible();
const a = await page.locator("td label").allTextContents();
const orderId = a[1].replace(/\|/g, '').trim();
console.log(a);
await page.getByRole("listitem").getByRole("button", {name:'ORDERS'}).click();
await expect(page.getByText(orderId)).toBeVisible();
await page.locator('tr').filter({ hasText: orderId }).getByRole('button', { name: 'View' }).click();
// await page.pause();



});