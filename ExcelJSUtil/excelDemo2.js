const ExcelJs = require('exceljs');

// website: https://rahulshettyacademy.com/upload-download-test/index.html
// async and await always go together
async function writeExcelTest(searchText, replaceText, change, filePath) {

    // collection of sheet - only asking for sheet1
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    // return from readExcel function
    // need await from any async function
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    // need await from any async function
    await workbook.xlsx.writeFile(filePath);

}


async function readExcel(worksheet, searchText) {

    // output is an object
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {

              // output = { row: rowNumber, column: colNumber }; 
                output.row = rowNumber;
                output.column = colNumber;

            }

        });
    });

    return output;
}
// calling the functon, execution start from line 22

// update mango price to 350
writeExcelTest("Mango", 350, {rowChange:0, colChange:2}, "C:/Users/Owner/Downloads/download.xlsx");