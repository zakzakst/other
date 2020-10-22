var config = {
  appUrl: 'https://script.google.com/macros/s/<公開GASアプリのID>/exec',
  spSheetId: '<スプレッドシートのID>',
  sheetNames: [
    '<シート名1>',
    '<シート名2>',
    '<シート名3>',
  ],
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId);
  },
  targetSheet: function(num) {
    return SpreadsheetApp.openById(this.spSheetId).getSheetByName(this.sheetNames[num]);
  },
};
