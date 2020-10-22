//==============================
// ■ダイアログを表示
//==============================
function templateDialog(type) {
  // データを渡してダイアログを表示
  var data = {
    templateNames: config.templateNames,
    type: type,
  };
  showDialog(data, 'html/templateOutput', 'テンプレート出力');
}


//==============================
// ■JSONデータを取得
//==============================
function getJsonData(type, templateName) {
  var dataRange;
  if(type == 'bySheet') {
    dataRange = config.activeSheet().getDataRange();
  } else if(type == 'bySelect') {
    dataRange = config.activeSheet().getActiveRange();
  }
  // 先頭行をキーとしてオブジェクトを作成
  var dataObj = convertObject(dataRange.getValues());
  // データをJSONに変更
  var dataJson = {
    data: dataObj,
    template: getTemplateData(templateName),
  };

  return dataJson;
}


//==============================
// ■テンプレートデータを取得
//==============================
function getTemplateData(sheetName) {
  var sheet = config.byNameSheet(sheetName);
  var dataTemplate = {
    template: sheet.getRange(1, 2).getValue(),
    insertBefore: sheet.getRange(2, 2).getValue(),
    insertMiddle: sheet.getRange(3, 2).getValue(),
    insertAfter: sheet.getRange(4, 2).getValue(),
  };

  return dataTemplate;
}


//==============================
// ■指定したデータ・HTMLより、ダイアログを表示
//==============================
function showDialog(data, html, title) {
  // HTMLテンプレートを作成
  var dialog = HtmlService.createTemplateFromFile(html);

  // テンプレートにデータを渡す
  dialog.data = data;

  // ダイアログを表示
  SpreadsheetApp.getUi().showModalDialog(dialog.evaluate(), title);
}


//==============================
// ■データの先頭行をキーとしてオブジェクトを作成
//==============================
function convertObject(data) {
  // 先頭行の配列を取得
  var dataKey = data[0];

  // 二行目以降の配列を取得
  data.shift();
  var dataProps = data;

  // オブジェクトを作成
  var dataObject = [];
  for(var i = 0; i < dataProps.length; i++) {
    var dataTemp = {};
    for(var j = 0; j < dataKey.length; j++) {
      dataTemp[dataKey[j]] = dataProps[i][j];
    }
    dataObject.push(dataTemp);
  }

  return dataObject
}
