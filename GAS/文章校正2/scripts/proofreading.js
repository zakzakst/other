/**
 * 文章校正の実行
 */
function proofreading() {
  var data = getProofreadingData(config.spSheet());

  for(var i = 0; i < data.length; i++) {
    proofreadingWord(data[i]);
  }
}


/**
 * 文章校正のクリア
 */
function clearProofreading() {
  var data = getProofreadingData(config.spSheet());

  for(var i = 0; i < data.length; i++) {
    clearProofreadingWord(data[i]);
  }
}


/**
 * 校正文言データを取得する
 *
 * @param {string} データ記載スプレッドシート
 * @return {array} 校正文言の2次元配列 （例：[['スマホ', 'スマートフォン'],['1人', '一人'],['１', '1']]）
 */
function getProofreadingData(spSheet) {
  var rangeNum = getDirectionNum(spSheet, 2, 1);
  var range = spSheet.getRange(2, 1, rangeNum.bottom, 2);
  var result = range.getValues();
  return result;
}


/**
 * 引数で与えられた文章校正を実行（一つの文言）
 *
 * @param {object} 校正文言と修正文言
 */
function proofreadingWord(word) {
  if(word[0] === '') {return;}

  // ドキュメントの文章を取得
  var body = config.activeDoc().getBody();
  var result = null;
  var count = 0;

  // 校正箇所のスタイルを変更
  while(result = body.findText(word[0], result)) {
    var text = result.getElement().asText();
    text.setBackgroundColor(result.getStartOffset(), result.getEndOffsetInclusive(), '#ffcccc');
    text.setBold(result.getStartOffset(), result.getEndOffsetInclusive(), true);
    count++;
  }

  // 脚注に校正情報を追記
  if(count === 0) {return;}
  footerInit();
  var footer = config.activeDoc().getFooter();
  footer.appendListItem('「' + word[0] + '」→「' + word[1] + '」：' + count + '箇所');
}


/**
 * 引数で与えられた文章校正をクリア（一つの文言）
 *
 * @param {object} 校正文言
 */
function clearProofreadingWord(word) {
  if(word[0] === '') {return;}

  // ドキュメントの文章を取得
  var body = config.activeDoc().getBody();
  var result = null;
  var count = 0;

  // 校正箇所のスタイルを変更
  while(result = body.findText(word[0], result)) {
    var text = result.getElement().asText();
    text.setBackgroundColor(result.getStartOffset(), result.getEndOffsetInclusive(), null);
    text.setBold(result.getStartOffset(), result.getEndOffsetInclusive(), false);
    count++;
  }
}


/**
 * フッターセクションの初期化
 */
function footerInit() {
  var footer = config.activeDoc().getFooter();
  if(!footer) {
    config.activeDoc().addFooter().appendParagraph('校正結果');
  }
}
