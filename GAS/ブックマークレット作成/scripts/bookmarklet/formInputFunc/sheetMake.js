function formInputSheetMake() {
  var bookmarklet = config.bookmarkletList[4];
  var sheet = insertSheet(bookmarklet.sheetName, 'confirm');
  if(!sheet) {return;}
  sheetFormat(sheet);

  function sheetFormat(sheet) {
    // 1～2列目のカラム幅を変更
    sheet.setColumnWidth(1, 100);
    sheet.setColumnWidth(2, 350);

    // 項目名見出し
    var contentNameHeading = sheet.getRange(1, 1);
    contentNameHeading.setValue('項目名');
    setStyleHeading(contentNameHeading);

    // JS見出し
    var contentJSHeading = sheet.getRange(1, 2);
    contentJSHeading.setValue('JS');
    setStyleHeading(contentJSHeading);

    // 各項目入力欄
    for(var i = 2; i <= 11; i++) {
      // 見出し
      var itemHeading = sheet.getRange(i, 1);
      itemHeading.setValue('項目名' + (i - 1));
      setStyleSubHeading(itemHeading);
      // 値入力欄
      var itemValue = sheet.getRange(i, 2);
      setStyleValue(itemValue);
    }

    // テンプレート見出し
    var templateHeading = sheet.getRange(12, 1);
    templateHeading.setValue('テンプレート');
    setStyleHeading(templateHeading);
    // テンプレート入力欄
    var templateValue = sheet.getRange(12, 2);
    setStyleValue(templateValue);
    // 12行目の高さを変更
    sheet.setRowHeight(12, 200);

    // 出力フォーム見出し
    var templateHeading = sheet.getRange(13, 1);
    templateHeading.setValue('出力フォーム');
    setStyleHeading(templateHeading);
    // 出力フォーム入力欄
    var templateValue = sheet.getRange(13, 2);
    setStyleValue(templateValue);

    // 入力例を記載
    sheet.getRange(2, 2).setValue('location.href');
    sheet.getRange(3, 2).setValue('document.title');
    sheet.getRange(12, 2).setValue('（※入力例）\nページURL：{{{項目名1}}}\nページタイトル：{{{項目名2}}}');
    sheet.getRange(13, 2).setValue('document.querySelector(\'<セレクタ名>\')');

    // 垂直揃えを「上」に変更
    sheet.getRange(1, 1, 13, 2).setVerticalAlignment('top');
  }
}
