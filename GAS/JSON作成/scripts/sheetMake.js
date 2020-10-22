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
  // 見出し入力欄
  var jsonHeading = newSheet.getRange(1, 1, 1, 5);
  setStyleHeading(jsonHeading);

  // 値入力欄
  var jsonValue = newSheet.getRange(2, 1, 3, 5);
  setStyleValue(jsonValue);
}
