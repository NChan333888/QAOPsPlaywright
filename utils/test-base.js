const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {

        testDataForOrder: {
            // Javascript object
            username: "abcefg@yopmail.com",
            password: "Abcefg123$$$",
            productName: "ZARA COAT 3"
        }


    }

)