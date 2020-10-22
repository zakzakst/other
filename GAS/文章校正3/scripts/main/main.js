function doGet(e) {
  var pageFlg = e.parameter.type
  if(pageFlg == 'page') {
    return showHighlightPage();
  } else {
    return showHighlightJson();
  }
}

function showHighlightJson() {
  var data = getHighlightData();
  var result = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return result
}

function showHighlightPage() {
  var html = HtmlService.createTemplateFromFile('html/bookmarklet');
  html.data = {
    funcStr: getHighlightFuncStr(),
    name: config.bookmarkletList[0].name,
  };
  return html.evaluate();
}
