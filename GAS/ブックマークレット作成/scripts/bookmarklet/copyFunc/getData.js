function getCopyFuncStr() {
  var bookmarklet = config.bookmarkletList[0];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return 'alert(\'情報入力シートが見つかりませんでした\');';}
  var result = makeFuncStr(sheet);
  return result;

  function makeFuncStr(sheet) {
    var text = getText(sheet);
    if(!text) {return 'alert(\'情報入力シートに値が入力されていませんでした\');';}
    var result = `navigator.clipboard.writeText(${text}).then(function () {alert('クリップボードにコピーしました');},function () {alert('コピーに失敗しました');});`;
    return result;
  }

  function getText(sheet) {
    var template = '\'' + sheet.getRange(12, 2).getValue() + '\'';
    for(var i = 2; i <= 11; i++) {
      var targetText = '{{{' + sheet.getRange(i, 1).getValue() + '}}}';
      var replaceText = '\'\+' + sheet.getRange(i, 2).getValue() + '\+\'';
      var replaceReg = new RegExp(targetText, 'g');
      template = template.replace(replaceReg, replaceText);
    }
    var result = nToText(template);
    return result;
  }
}
