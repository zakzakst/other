function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('ファイル出力');
  menu.addItem('シートの内容からファイル作成', 'fileMake');
  menu.addItem('オプション付きでファイル作成', 'showOptionPanel');
  menu.addItem('シートに入力欄を作成', 'activeSheetInit');
  menu.addToUi();
}
