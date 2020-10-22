var config = {
  apiUrl: '<公開アプリのURL>',
  spSheetId: '<スプレッドシートのID>',
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId);
  },
  bookmarkletList: [
    {
      name: '文字列ハイライト',
      sheetMake: 'highlightSheetMake',
      sheetName: '文字列ハイライト',
    },
  ]
};
