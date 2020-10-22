//==============================
// ■ 名前を指定してシートを挿入
//==============================
function insertSheet(name, insertType) {
  // === 指定した名前のシートがすでに存在した場合の処理 ===
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if(targetSheet) {
    if(insertType == 'always') {
      // 常に新規シートを挿入
      deleteSheet(name);
    }
    else if(insertType == 'confirm') {
      // 確認して「OK」の場合に新規シートを挿入
      var confirmRes = Browser.msgBox('シート「' + name + '」はすでに存在します。上書きしますか？', Browser.Buttons.OK_CANCEL);
      Logger.log(confirmRes);
      if(confirmRes == 'cancel') { return; }
      deleteSheet(name);
    }
    else {
      // 常に挿入をキャンセル
      return;
    }
  }

  // === 指定した名前でシートを挿入 ===
  var insertItem = SpreadsheetApp.getActiveSpreadsheet().insertSheet(name, 0);
  return insertItem;
}


//==============================
// ■ 指定した名前のシートを削除
//==============================
function deleteSheet(name) {
  var spSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spSheet.getSheetByName(name);
  if(sheet) {
    spSheet.deleteSheet(sheet);
  }
}


//==============================
// ■ 各種セルにスタイルを設定
//==============================
function setStyleHeading(range) {
  range
    .setBackground('#333')
    .setFontColor('#fff')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID)
    .setVerticalAlignment('top');
}

function setStyleSubHeading(range) {
  range
    .setBackground('#666')
    .setFontColor('#fff')
    .setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID)
    .setVerticalAlignment('top');
}

function setStyleValue(range) {
  range
    .setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID)
    .setVerticalAlignment('top');
}


//==============================
// ■ シート名のリスト全てに処理を実行
//==============================
function forEachSheets(sheetNames, callback) {
  sheetNames.forEach(function(name, index) {
    callback(name, index);
  });
}


//==============================
// ■ 指定範囲でデータが入力されている範囲を調べる
//==============================
function rangeDataNum(range) {
  // === rangeの二次元配列を取得 ===
  var dataArr = range.getValues();

  // === 一番上の行の配列からカラム数を取得 ===
  var dataTop = dataArr[0];
  for(var i = dataTop.length - 1; i > 0; i--) {
    if(dataTop[i] == '') {
      // 配列の中身が空欄の場合、その要素を削除（※配列の最後から確認していく）
      dataTop.pop();
    } else {
      break;
    }
  }

  // === 二次元配列の各要素の1番目を調べて、要素数を取得 ===
  var dataLeft = dataArr;
  for(var j = dataLeft.length - 1; j > 0; j--) {
    if(dataLeft[j][0] == '') {
      // 配列の中身が空欄の場合、その要素を削除（※配列の最後から確認していく）
      dataLeft.pop();
    } else {
      break;
    }
  }

  var rangeNum = {
    col: dataTop.length,
    row: dataLeft.length
  };
  return rangeNum;
}
