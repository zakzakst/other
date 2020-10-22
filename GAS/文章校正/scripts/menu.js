function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('文章校正');
  menu.addItem('新規シート作成', 'sheetNew');
  menu.addItem('設定情報からシート作成', 'sheetInit');
  menu.addToUi();
}
