/**
 * オプション付きファイル作成の実行パネルを表示
 */
function showOptionPanel() {
  var panel = HtmlService.createTemplateFromFile('html/optionPanel');
  SpreadsheetApp.getUi().showSidebar(panel.evaluate().setTitle('オプション'));
}


/**
 * シートの内容からファイル作成
 *
 * @param {object} オプション情報のオブジェクト
 */
function fileMake(option) {
  // 入力されている内容からファイル用のデータを作成
  var sheet = SpreadsheetApp.getActiveSheet();
  var fileData = fileDataMake(sheet);
  if(option) {
    // オプションが指定されている場合は内容を設定
    fileData.name += option.date;
  }

  outputFile(fileData);

  Browser.msgBox('ファイルの出力が完了しました');
}


/**
 * シートの内容からファイル出力用のデータを作成する
 *
 * @param {sheet} データ記載スプレッドシート
 * @return {object} ファイル作成用データのオブジェクト
 */
function fileDataMake(sheet) {
  var data = {
    folderId: config.folderId,
    name: sheet.getRange(1, 2).getValue(),
    type: sheet.getRange(2, 2).getValue(),
    content: sheet.getRange(3, 2).getValue(),
  };
  return data;
}


/**
 * 受け取ったデータを元にファイルを出力
 *
 * @param {object} ファイル作成用データのオブジェクト
 */
function outputFile(fileData) {
  var folder = DriveApp.getFolderById(fileData.folderId);
  folder.createFile(fileData.name, fileData.content, MimeType[fileData.type]);
}


/**
 * 現在開いているシートに入力欄を作成
 */
function activeSheetInit() {
  var sheet = SpreadsheetApp.getActiveSheet();
  setStyleSheet(sheet);
}


/**
 * 指定したシートに入力欄を作成
 *
 * @param {sheet} スプレッドシート
 */
function setStyleSheet(sheet) {
  // カラム幅を設定
  sheet.setColumnWidth(2, 250);

  // ファイル名入力欄
  var nameHeading = sheet.getRange(1, 1);
  nameHeading.setValue('ファイル名');
  setStyleHeading(nameHeading);
  var nameValue = sheet.getRange(1, 2);
  setStyleValue(nameValue);

  // ファイルタイプ入力欄
  var typeHeading = sheet.getRange(2, 1);
  typeHeading.setValue('ファイルタイプ');
  setStyleHeading(typeHeading);
  var typeValue = sheet.getRange(2, 2);
  setStyleValue(typeValue);
  // ファイルタイプの設定から、セレクトボックスを作成
  typeValue.setDataValidation(SpreadsheetApp.newDataValidation()
    .setAllowInvalid(true)
    .requireValueInList(config.fileTypes, true)
    .build());

  // 内容入力欄
  var contentHeading = sheet.getRange(3, 1);
  contentHeading.setValue('内容');
  setStyleHeading(contentHeading);
  var contentValue = sheet.getRange(3, 2);
  setStyleValue(contentValue);
  sheet.setRowHeight(3, 300);
}
