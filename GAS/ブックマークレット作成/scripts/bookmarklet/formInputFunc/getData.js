function getFormInputFuncStr() {
  var bookmarklet = config.bookmarkletList[4];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return 'alert(\'情報入力シートが見つかりませんでした\');';}
  var result = makeFuncStr(sheet);
  return result;

  function makeFuncStr(sheet) {
    var text = getText(sheet);
    if(!text) {return 'alert(\'情報入力シートに値が入力されていませんでした\');';}
    var target = sheet.getRange(13, 2).getValue();
    var result = `var targetInput = ${target}; setTimeout(() => {targetInput.value = ${text};}, 400);`;
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
