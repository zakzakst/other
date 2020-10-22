function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('テンプレート出力');
  menu.addItem('シート全体からテンプレート出力', 'templateDialogBySheet');
  menu.addItem('選択範囲からテンプレート出力', 'templateDialogBySelect');
  menu.addItem('新規テンプレートシート作成', 'templateSheetNew');
  menu.addItem('新規データシート作成', 'dataSheetNew');
  menu.addItem('設定情報からシート作成', 'sheetInit');
  menu.addToUi();
}

// GASのメニューに引数を持たせられないため、下記関数を定義
function templateDialogBySheet() {
  templateDialog('bySheet');
}
function templateDialogBySelect() {
  templateDialog('bySelect');
}
