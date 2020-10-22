function getHighlightData() {
  var bookmarklet = config.bookmarkletList[0];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return '';}
  var result = getArray(sheet);
  return result;

  function getArray(sheet) {
    var directionNum = getDirectionNum(sheet, 2, 1);
    var dataRange = sheet.getRange(2, 1, directionNum.bottom, directionNum.right);
    var result = dataRange.getValues();
    return result;
  }
}

function getHighlightFuncStr() {
  var styleStr = 'background:#ffcccc; display:inline-block; font-weight:bold; cursor:pointer; margin:0 2px; padding:0 4px; border-radius: 2px;';
  var result = `const checkJson = getJson();checkJson.then((data) => {if(data == '') {alert('チェック用データが見つかりませんでした'); return;} var bodyEl = document.body; var checks = data; var count = 0; for(var i = 0; i < checks.length; i++){var check = checks[i]; var checkResult = wordCheck(check); if(checkResult) {count++;}} if(count === 0) { alert('ワードは検出されませんでした');} else { alert('チェックが完了しました');} function wordCheck(check){var reg = new RegExp('(' + check[0] + ')', 'g'); var str = check[1]; var note = check[2]; var txt = bodyEl.innerHTML; if(txt.match(reg)){bodyEl.innerHTML = txt.replace(reg, '<b style=\\\'${styleStr}\\\' title=\\\'【推奨文言：' + str + '】\\n' + note + '\\\'>$1</b>'); return true;} else {return false;}}}); function getJson() {const url = '${config.apiUrl}'; return new Promise(function(resolve) {fetch(url).then((response) => {return response.json();}).then((data) => {resolve(data);}).catch(error => {console.log(error); alert('エラーが発生しました'); return;});});}`
  return result;
}
