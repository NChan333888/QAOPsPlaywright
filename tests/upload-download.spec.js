
const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

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

test('Upload download excel validation', async ({page})=>
{
    const textSearch = "Mango";
    const updateValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    // keep waiting until download is completed and promise is resolved
    // call for that event to happen and wait for that event to complete
    const download = await downloadPromise;
    const filePath = "C:/Users/Owner/Downloads/download.xlsx";
    await download.saveAs(filePath);
    await writeExcelTest(textSearch, 350, {rowChange:0, colChange:2}, filePath);
    //This can be removed -> await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    // From AI - Method 1
    // const mangoRow = page.locator("div[role='row']").filter({ hasText: "Mango" });
    // await expect(mangoRow).toContainText("350");

    // From Instructor - Method 2
    const textlocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has:textlocator});
    // From instructor, use desireRow to locate the cell
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    // This works also with simpler code to scan the row for "350"
    // await expect(desiredRow).toContainText(updateValue);


    // From AI - Method 3 
    // const desiredRow = await page.getByRole('row').filter({ hasText: 'Mango' });
    // await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});