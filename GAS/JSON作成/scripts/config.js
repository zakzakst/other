var config = {
  spSheetId: '<スプレッドシートのID>',
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId);
  },
  activeSheet: function() {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
};
