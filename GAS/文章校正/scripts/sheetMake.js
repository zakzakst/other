//==============================
// ■ 新規シート作成
//==============================
function sheetNew() {
  // === シート名入力ポップアップを表示 ===
  var sheetNameInput = Browser.inputBox('シート名を入力してください', Browser.Buttons.OK_CANCEL);
  if(sheetNameInput == 'cancel') {
    // 入力がキャンセルされた場合は処理を終了
    return;
  } else if(sheetNameInput == '') {
    // 入力フォームが空欄の場合は、エラーメッセージを表示
    Browser.msgBox('シート名が入力されていません');
    return;
  }

  // === 入力されたシート名で新規シートを作成 ===
  sheetMake(sheetNameInput);
}


//==============================
// ■ 設定情報からシート作成
//==============================
function sheetInit() {
  config.sheetNames.forEach(function(sheetName) {
    sheetMake(sheetName);
  });
}


//==============================
// ■ 検索順位出力用シートの作成
//==============================
function sheetMake(sheetName) {
  // === 新規シートを作成 ===
  var newSheet = insertSheet(sheetName, 'confirm');
  if(!newSheet) {
    // 新規シートが作成されなかった場合は処理を終了
    return;
  }

  // === 新規シートに入力フォーマットを適用 ===
  // // 1～3列目のカラム幅を変更
  newSheet.setColumnWidth(1, 175);
  newSheet.setColumnWidth(2, 175);
  newSheet.setColumnWidth(3, 175);

  // チェック名入力欄
  var pageNameHeading = newSheet.getRange(1, 1);
  pageNameHeading.setValue('チェック名');
  setStyleHeading(pageNameHeading);
  var pageNameValue = pageNameHeading.offset(0, 1);
  pageNameValue.setValue('--- ページ名を記入してください ---');
  setStyleValue(pageNameValue);

  // チェック概要入力欄
  var pageUrlHeading = newSheet.getRange(2, 1);
  pageUrlHeading.setValue('チェック概要');
  setStyleHeading(pageUrlHeading);
  var pageUrlValue = pageUrlHeading.offset(0, 1);
  pageUrlValue.setValue('--- チェック概要を記入してください ---');
  setStyleValue(pageUrlValue);

  // チェックする文字列入力欄
  var checkTextHeading = newSheet.getRange(4, 1);
  checkTextHeading.setValue('チェックする文字列');
  setStyleHeading(checkTextHeading);
  var checkTextValue = newSheet.getRange(5, 1, 5, 1);
  setStyleValue(checkTextValue);

  // 修正文字列入力欄
  var fixTextHeading = newSheet.getRange(4, 2);
  fixTextHeading.setValue('修正文字列');
  setStyleHeading(fixTextHeading);
  var fixTextValue = newSheet.getRange(5, 2, 5, 1);
  setStyleValue(fixTextValue);

  // 備考入力欄
  var remarksHeading = newSheet.getRange(4, 3);
  remarksHeading.setValue('備考');
  setStyleHeading(remarksHeading);
  var remarksValue = newSheet.getRange(5, 3, 5, 1);
  setStyleValue(remarksValue);
}
