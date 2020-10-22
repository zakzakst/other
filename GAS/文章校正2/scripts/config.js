var config = {
  activeDoc: function() {
    return DocumentApp.getActiveDocument();
  },
  spSheetId: '<スプレッドシートのID>',
  spSheetName: '校正リスト',
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId).getSheetByName(this.spSheetName);
  },
};
