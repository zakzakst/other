function highlightSheetMake() {
  var bookmarklet = config.bookmarkletList[3];
  var sheet = insertSheet(bookmarklet.sheetName, 'confirm');
  if(!sheet) {return;}
  sheetFormat(sheet);

  function sheetFormat(sheet) {
    // 1～3列目のカラム幅を変更
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 300);

    // 対象文言見出し
    var targetTextHeading = sheet.getRange(1, 1);
    targetTextHeading.setValue('対象文言');
    setStyleHeading(targetTextHeading);

    // 修正文言見出し
    var fixTextHeading = sheet.getRange(1, 2);
    fixTextHeading.setValue('修正文言');
    setStyleHeading(fixTextHeading);

    // 備考見出し
    var fixNoteHeading = sheet.getRange(1, 3);
    fixNoteHeading.setValue('備考');
    setStyleHeading(fixNoteHeading);

    // 入力欄
    for(var i = 2; i <= 11; i++) {
      var itemValue = sheet.getRange(i, 1, 1, 3);
      setStyleValue(itemValue);
    }

    // 入力例を記載
    sheet.getRange(2, 1).setValue('JS|ＪＳ');
    sheet.getRange(2, 2).setValue('JavaScript');
    sheet.getRange(2, 3).setValue('省略せずに表記してください\n※ライブラリ名に利用されている場合は省略も可');
    sheet.getRange(3, 1).setValue('\\d{4,}');
    sheet.getRange(3, 2).setValue('\'1,234');
    sheet.getRange(3, 3).setValue('4桁以上の数字にはカンマを入れてください');
    sheet.getRange(4, 1).setValue('\'０');
    sheet.getRange(4, 2).setValue('0');
    sheet.getRange(4, 3).setValue('半角文字を利用してください');

    // 垂直揃えを「上」に変更
    sheet.getRange(1, 1, 11, 2).setVerticalAlignment('top');
  }
}
