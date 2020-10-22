function getDomainFuncStr() {
  var bookmarklet = config.bookmarkletList[2];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return 'alert(\'情報入力シートが見つかりませんでした\');';}
  var result = makeFuncStr(sheet);
  return result;

  function makeFuncStr(sheet) {
    var array = getArray(sheet);
    if(!array) {return 'alert(\'情報入力シートに値が入力されていませんでした\');';}
    var arrayStr = JSON.stringify(array);
    var result = `var domains = ${arrayStr}; for(var domain of domains ) {if(location.host == domain[0]) {location.href = location.href.replace(domain[0], domain[1]); break;} else if(location.host == domain[1]) {location.href = location.href.replace(domain[1], domain[0]); break;}}`;
    return result;
  }

  function getArray(sheet) {
    var directionNum = getDirectionNum(sheet, 2, 1);
    var dataRange = sheet.getRange(2, 1, directionNum.bottom, directionNum.right);
    var result = dataRange.getValues();
    return result;
  }
}
