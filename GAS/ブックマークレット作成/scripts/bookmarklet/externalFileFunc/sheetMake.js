function externalFileSheetMake() {
  var bookmarklet = config.bookmarkletList[5];
  var sheet = insertSheet(bookmarklet.sheetName, 'confirm');
  if(!sheet) {return;}
  sheetFormat(sheet);

  function sheetFormat(sheet) {
    // 1～2列目のカラム幅を変更
    sheet.setColumnWidth(1, 100);
    sheet.setColumnWidth(2, 350);

    // ファイルURL見出し
    var fileUrlHeading = sheet.getRange(1, 1);
    fileUrlHeading.setValue('ファイルURL');
    setStyleHeading(fileUrlHeading);

    // ファイルURL入力欄
    var fileUrlValue = sheet.getRange(1, 2);
    fileUrlValue.setValue('https://sample.com/path/to/script.js');
    setStyleValue(fileUrlValue);
  }
}
