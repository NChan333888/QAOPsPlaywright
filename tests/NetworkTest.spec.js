import {test, expect, request} from '@playwright/test';
const {APiUtils} = require('../utils/APiUtils');

// Note: For keys, we do not need any double quotes
const loginPayLoad = {userEmail: "abcefg@yopmail.com", userPassword: "Abcefg123$$$"};
const orderPayLoad = {orders:[{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"}; // javascript object
// const -> needs to declare value, for initializing, let -> no need to declare value
let response;

test.beforeAll( async()=> {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    
});

// Create order is success

test('@API Place the order', async ({page}) => 
{
    // const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    // const orderId = createOrder(orderPayLoad);
    
    // Inject token for login - need to add await 
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client/");
    // Route to this url after login
    // have to happen before click on the order
    // use * at end of url for generalizing all users log in
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route=>
    {
       const response = await page.request.fetch(route.request());
       // convert a javascript object to a JSON string
       let body = JSON.stringify(fakePayLoadOrders);
       route.fulfill 
       ({
            response,
            body,  // fake body


        })
        // intercepting response - Api response->{playwright fakeresponse}->browser->render data on front end
    });

    await page.locator("button[routerlink*='myorders']").click();
    // await page.pause();
    // wait for Api response before {playwright fakeresponse}
    // use * at end of url for generalizing all users log in
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator('.mt-4').textContent());
 
});  