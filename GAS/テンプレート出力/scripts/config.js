var config = {
  spSheetId: '<スプレッドシートのID>',
  templateNames: [
    '<テンプレート名1>',
    '<テンプレート名2>',
    '<テンプレート名3>',
  ],
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId);
  },
  targetSheet: function(num) {
    return SpreadsheetApp.openById(this.spSheetId).getSheetByName(this.sheetNames[num]);
  },
  byNameSheet: function(sheetName) {
    return SpreadsheetApp.openById(this.spSheetId).getSheetByName(sheetName);
  },
  activeSheet: function() {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  },
};
