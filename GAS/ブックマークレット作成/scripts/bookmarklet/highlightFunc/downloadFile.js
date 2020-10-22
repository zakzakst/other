function downloadHighlightFile() {
  var bookmarklet = config.bookmarkletList[3];
  var sheet = config.spSheet().getSheetByName(bookmarklet.sheetName);
  if(!sheet) {return 'alert(\'情報入力シートが見つかりませんでした\');';}
  var data = {
    content: makeFuncStr(sheet),
    type: 'text/javascript',
  };
  downloadHighlightDialog(data);

  function downloadHighlightDialog(data) {
    var title = '文言ハイライトJSダウンロード';
    var templatePath = 'scripts/bookmarklet/highlightFunc/download';
    var dialogHeight = 250;
    var dialogWidth = 400;

    // ダイアログを表示
    var template = HtmlService.createTemplateFromFile(templatePath);
    template.data = data;
    var dialog = template.evaluate().setHeight(dialogHeight).setWidth(dialogWidth);
    SpreadsheetApp.getUi().showModalDialog(dialog, title);
  }

  function makeFuncStr(sheet) {
    var array = getArray(sheet);
    if(!array) {return 'alert(\'情報入力シートに値が入力されていませんでした\');';}
    var arrayStr = JSON.stringify(array);
    var styleStr = 'background:#ffcccc; display:inline-block; font-weight:bold; cursor:pointer; margin:0 2px; padding:0 4px; border-radius: 2px;';
    var result = `(function() {var bodyEl = document.body; var checks = ${arrayStr}; var count = 0; for(var i = 0; i < checks.length; i++){var check = checks[i]; var checkResult = wordCheck(check); if(checkResult) {count++;}} if(count === 0) { alert('ワードは検出されませんでした');} function wordCheck(check){var reg = new RegExp('(' + check[0] + ')', 'g'); var str = check[1]; var note = check[2]; var txt = bodyEl.innerHTML; if(txt.match(reg)){bodyEl.innerHTML = txt.replace(reg, '<b style=\\\'${styleStr}\\\' title=\\\'【推奨文言：' + str + '】\\n' + note + '\\\'>$1</b>'); return true;} else {return false;}}})();`;
    return result;
  }

  function getArray(sheet) {
    var directionNum = getDirectionNum(sheet, 2, 1);
    var dataRange = sheet.getRange(2, 1, directionNum.bottom, directionNum.right);
    var result = dataRange.getValues();
    return result;
  }
}
