function domainSheetMake() {
  var bookmarklet = config.bookmarkletList[2];
  var sheet = insertSheet(bookmarklet.sheetName, 'confirm');
  if(!sheet) {return;}
  sheetFormat(sheet);

  function sheetFormat(sheet) {
    // 1～2列目のカラム幅を変更
    sheet.setColumnWidth(1, 200);
    sheet.setColumnWidth(2, 200);

    // ドメイン1見出し
    var domainNameHeading1 = sheet.getRange(1, 1);
    domainNameHeading1.setValue('ドメイン1');
    setStyleHeading(domainNameHeading1);

    // ドメイン2見出し
    var domainNameHeading2 = sheet.getRange(1, 2);
    domainNameHeading2.setValue('ドメイン2');
    setStyleHeading(domainNameHeading2);

    // 入力欄
    for(var i = 2; i <= 11; i++) {
      var itemValue = sheet.getRange(i, 1, 1, 2);
      setStyleValue(itemValue);
    }

    // 入力例を記載
    sheet.getRange(2, 1).setValue('127.0.0.1:5500');
    sheet.getRange(2, 2).setValue('sample.domain.com');
  }
}
