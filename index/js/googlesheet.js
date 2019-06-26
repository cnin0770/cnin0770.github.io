// credits to: https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175

function doGet(e) {
    return handleResponse(e);
}

var SHEET_NAME = "Sheet1";

var SCRIPT_PROP = PropertiesService.getScriptProperties();

function handleResponse(e) {
    // LockService: http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
    var lock = LockService.getPublicLock();
    // wait 30 seconds before conceding defeat.
    lock.waitLock(30000); 

    try {
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
        var sheet = doc.getSheetByName(SHEET_NAME);

        var headRow = e.parameter.header_row || 1;
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

        for (i in headers) {
            if (headers[i] == "Timestamp") {
                row.push(new Date());
            } else {
                row.push(e.parameter[headers[i]]);
            }
        }

        var nextRow = sheet.getLastRow() + 1; 
        var row = [];
        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        return ContentService
            .createTextOutput(JSON.stringify({
                "result": "success",
                "row": nextRow
            }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({
                "result": "error",
                "error": e
            }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}