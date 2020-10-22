function externalFileFuncStr() {
  var bookmarklet = config.bookmarkletList[5];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return 'alert(\'情報入力シートが見つかりませんでした\');';}
  var result = makeFuncStr(sheet);
  return result;

  function makeFuncStr(sheet) {
    var text = getText(sheet);
    if(!text) {return 'alert(\'情報入力シートに値が入力されていませんでした\');';}
    var result = `var bodyEl = document.body; var scriptEl = document.createElement('script'); scriptEl.src = '${text}'; bodyEl.appendChild(scriptEl);`;
    return result;
  }

  function getText(sheet) {
    var url = sheet.getRange(1, 2).getValue();
    var result = url;
    return result;
  }
}
