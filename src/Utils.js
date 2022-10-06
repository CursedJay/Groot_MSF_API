function hideSheet(sheetName) {
  SpreadsheetApp.getActive().getSheetByName(sheetName).hideSheet();
}

function showSheet(sheetName) {
  SpreadsheetApp.getActive().getSheetByName(sheetName).showSheet();
}

function isHidden(sheetName) {
  return SpreadsheetApp.getActive().getSheetByName(sheetName).isSheetHidden();
}

function getNamedRange(name) {
  return SpreadsheetApp.getActive().getRangeByName(name);
}
