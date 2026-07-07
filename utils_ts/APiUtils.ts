export class APiUtils
{
    apiContext : any; 
    loginPayLoad : string;

    constructor(apiContext: any, loginPayLoad: string)
    {
        this.apiContext = apiContext; 
        this.loginPayLoad = loginPayLoad;
    }
    
    
    // always put async when using await
    async getToken()
    {
         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        });

        // Verify login is successful, return should start with '2'. e.g. 200, 201 etc.
        // await required for any method calls
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);   
        return token;
    }

    // Dynamtically create any order by having the payload in your actual test
    // only create order with the data that you've provided
    async createOrder(orderPayLoad:string) 
    {
        // response - empty javascrpt object
        let response = {token: String, orderId: String};
        response.token = await this.getToken();   // whenever call an async method, need to add await
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
         data: orderPayLoad,
            headers: {
            'Authorization': response.token,   // current class
            'content-type' : 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;   // assign a property to the response object
        return response;

    }
}

// module.exports = {APiUtils};