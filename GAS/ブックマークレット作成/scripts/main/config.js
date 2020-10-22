var config = {
  spSheetId: '<スプレッドシートのID>',
  spSheet: function() {
    return SpreadsheetApp.openById(this.spSheetId);
  },
  bookmarkletList: [
    {
      name: '文字列コピー',
      funcType: 'copyFunc',
      sheetMake: 'copySheetMake',
      sheetName: '文字列コピー',
    },
    {
      name: '情報表示',
      funcType: 'infoFunc',
      sheetMake: 'infoSheetMake',
      sheetName: '情報表示',
    },
    {
      name: 'ドメイン切替',
      funcType: 'domainFunc',
      sheetMake: 'domainSheetMake',
      sheetName: 'ドメイン切替',
    },
    {
      name: '文字列ハイライト',
      funcType: 'highlightFunc',
      sheetMake: 'highlightSheetMake',
      sheetName: '文字列ハイライト',
    },
    {
      name: 'フォーム張付',
      funcType: 'formInputFunc',
      sheetMake: 'formInputSheetMake',
      sheetName: 'フォーム張付',
    },
    {
      name: '外部ファイル実行',
      funcType: 'externalFileFunc',
      sheetMake: 'externalFileSheetMake',
      sheetName: '外部ファイル実行',
    },
  ]
};
