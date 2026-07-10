const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    // this.cartProducts = page.locator("div li").first();
    // Chatgpt - Products displayed inside the shopping cart
    this.cartProducts = page.locator(".cartSection h3");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    // this.checkout = page.locator("text=Checkout");
    this.checkout = page.getByText("Checkout", { exact: true });
  }

  async VerifyProductIsDisplayed(productName) {
    // await this.cartProducts.waitFor();
    // const bool =await this.getProductLocator(productName).isVisible();
    // expect(bool).toBeTruthy();
    // toBeVisible() already waits automatically, so a separate waitFor() is unnecessary.
    const product = this.getProductLocator(productName);
    await expect(product).toBeVisible();
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    // return  this.page.locator("h3:has-text('"+productName+"')");
    // This makes sure Playwright searches for the product specifically inside the cart, rather than matching any <h3> elsewhere on the page.
    return this.page.locator(".cartSection h3", {
      hasText: productName,
    });
  }
}
module.exports = { CartPage };
