const ExcelJs = require('exceljs');

// website: https://rahulshettyacademy.com/upload-download-test/index.html
const workbook = new ExcelJs.Workbook();
workbook.xlsx.readFile("C:/Users/Owner/Downloads/download.xlsx"). then(function()
{


    const worksheet = workbook.getWorksheet('Sheet1');
    // For loop
    worksheet.eachRow((row, rowNumber) => 
    {
        // for loop
        row.eachCell( (cell, colNumber) =>
        {
            console.log(cell.value);
        });


    });


});
