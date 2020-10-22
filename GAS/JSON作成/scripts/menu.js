function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('JSON作成');
  menu.addItem('シート全体からJSON作成', 'downloadDialogBySheet');
  menu.addItem('選択範囲からJSON作成', 'downloadDialogBySelect');
  menu.addItem('新規シート作成', 'sheetNew');
  menu.addToUi();
}

// GASのメニューに引数を持たせられないため、下記関数を定義
function downloadDialogBySheet() {
  downloadDialog('bySheet');
}
function downloadDialogBySelect() {
  downloadDialog('bySelect');
}
