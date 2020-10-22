//==============================
// ■ 新規テンプレートシート作成
//==============================
function templateSheetNew() {
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
  templateSheetMake(sheetNameInput);
}


//==============================
// ■ 新規データシート作成
//==============================
function dataSheetNew() {
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
  dataSheetMake(sheetNameInput);
}


//==============================
// ■ 設定情報からシート作成
//==============================
function sheetInit() {
  // テンプレートシートを設定情報から作成
  config.templateNames.forEach(function(sheetName) {
    templateSheetMake(sheetName);
  });

  // データシートをシート名「データ」で作成
  dataSheetMake('データ');
}


//==============================
// ■ テンプレートシートの作成
//==============================
function templateSheetMake(sheetName) {
  // === 新規シートを作成 ===
  var newSheet = insertSheet(sheetName, 'confirm');
  if(!newSheet) {
    // 新規シートが作成されなかった場合は処理を終了
    return;
  }

  // === 新規シートに入力フォーマットを適用 ===
  // 1列目のカラム幅を変更
  newSheet.setColumnWidth(2, 500);

  // テンプレート入力欄
  var pageNameHeading = newSheet.getRange(1, 1);
  pageNameHeading.setValue('テンプレート');
  setStyleHeading(pageNameHeading);
  var pageNameValue = pageNameHeading.offset(0, 1);
  setStyleValue(pageNameValue);
  newSheet.setRowHeight(1, 200);

  // 挿入：先頭入力欄
  var pageNameHeading = newSheet.getRange(2, 1);
  pageNameHeading.setValue('挿入：先頭');
  setStyleHeading(pageNameHeading);
  var pageNameValue = pageNameHeading.offset(0, 1);
  setStyleValue(pageNameValue);
  newSheet.setRowHeight(2, 100);

  // 挿入：要素間入力欄
  var pageNameHeading = newSheet.getRange(3, 1);
  pageNameHeading.setValue('挿入：要素間');
  setStyleHeading(pageNameHeading);
  var pageNameValue = pageNameHeading.offset(0, 1);
  setStyleValue(pageNameValue);
  newSheet.setRowHeight(3, 100);

  // 挿入：末尾入力欄
  var pageNameHeading = newSheet.getRange(4, 1);
  pageNameHeading.setValue('挿入：末尾');
  setStyleHeading(pageNameHeading);
  var pageNameValue = pageNameHeading.offset(0, 1);
  setStyleValue(pageNameValue);
  newSheet.setRowHeight(4, 100);
}


//==============================
// ■ データ入力シートの作成
//==============================
function dataSheetMake(sheetName) {
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
