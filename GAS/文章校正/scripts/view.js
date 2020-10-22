//==============================
// ■ 文章校正ページの表示
//==============================
function doGet(e) {
  // パラメータよりデータを取得するシートを指定
  var sheetNum = e.parameter.page || 1;
  var data = pageData(sheetNum);
  var html = HtmlService.createTemplateFromFile('html/proofreading');
  html.data = data;
  return html.evaluate();
}


//==============================
// ■ ページ表示用データの作成
//==============================
function pageData(sheetNum) {
  // === データを取得するシートの設定 ===
  var sheet = config.targetSheet(sheetNum - 1);

  // === 各種データの設定 ===
  // ナビゲーション
  var navList = config.sheetNames;

  // ページ名・URL
  var pageInfo = {
    name: sheet.getRange(1, 2).getValue(),
    description: sheet.getRange(2, 2).getValue(),
  };

  // === データを返す ===
  var data = {
    navList: navList,
    pageInfo: pageInfo,
    sheetNum:sheetNum,
    appUrl: config.appUrl,
  };
  return data;
}


//==============================
// ■ 校正用データの作成
//==============================
function checkData(pageNum) {
  // === データを取得するシートの設定 ===
  var sheet = config.targetSheet(pageNum - 1);

  // === データの取得 ===
  var dataNum = getDirectionNum(sheet, 5, 1).bottom;
  var dataRange = sheet.getRange(5, 1, dataNum, 3).getValues();

  // === 取得したデータをチェック用に加工 ===
  var checkList = [];
  dataRange.forEach(function(data) {
    var checkItem = {
      text: data[0],
      fix: data[1],
      remarks: data[2],
    }
    checkList.push(checkItem);
  });

  return checkList;
}
