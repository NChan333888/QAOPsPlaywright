import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};


export const customTest = baseTest.extend <{testDataForOrder: TestDataForOrder} > (
    {

        testDataForOrder: {
            // Javascript object
            username: "abcefg@yopmail.com",
            password: "Abcefg123$$$",
            productName: "ZARA COAT 3"
        }


    }

)