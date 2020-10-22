function doGet() {
  var data = [];
  config.bookmarkletList.forEach(function(bookmarklet) {
    var itemData = {
      name: bookmarklet.name,
      funcStr: getFuncStr(bookmarklet.funcType),
    }
    data.push(itemData);
  });
  var html = HtmlService.createTemplateFromFile('html/bookmarklet');
  html.data = data;
  return html.evaluate();
}

function getFuncStr(funcType) {
  switch(funcType) {
    case 'copyFunc':
      return getCopyFuncStr();
    case 'infoFunc':
      return getInfoFuncStr();
    case 'domainFunc':
      return getDomainFuncStr();
    case 'highlightFunc':
      return getHighlightFuncStr();
    case 'formInputFunc':
      return getFormInputFuncStr();
    case 'externalFileFunc':
      return externalFileFuncStr();
    default:
      return `alert('ブックマークレットの登録に失敗しました');`;
  }
}
