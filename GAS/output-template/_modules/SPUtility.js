/**
 * スプレッドシート汎用処理のクラス
 * @param {String} spId スプレッドシートのID
 */
class SPUtility {
  constructor(spId) {
    this.id = spId;
    this.app = SpreadsheetApp.openById(spId);
  }

  /**
   * シート名からシートオブジェクトを取得
   * @param {String} name シート名
   * @return スプレッドシートのシートオブジェクト
   */
  getSheetByName(name) {
    return this.app.getSheetByName(name);
  }

  /**
   * シート番号からシートオブジェクトを取得
   * @param {Number} num シート番号
   * @return スプレッドシートのシートオブジェクト
   */
  getSheetByNum(num) {
    return this.app.getSheets()[num];
  }

  /**
   * アクティブシートを取得
   * @return スプレッドシートのシートオブジェクト
   */
  getActiveSheet() {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }

  /**
   * シート全体のデータ配列取得
   * @param {String} name シート名
   * @return {Array} スプレッドシートのデータの先頭行をキーとした配列
   */
  getDataFromSheetData(name) {
    // 対象のシートを取得
    const sheet = this.getSheetByName(name);
    // シート内のデータ入力範囲を取得
    const sheetData = sheet.getDataRange();
    // データを作成
    const result = this.makeData(sheetData.getValues());
    return result;
  }

  /**
   * データ配列作成
   * @param {Array} dataRange スプレッドシートのデータレンジオブジェクトの値
   * @return {Array} スプレッドシートのデータの先頭行をキーとした配列
   */
  makeData(dataRange) {
    // 先頭行の配列を取得
    const dataKeys = dataRange.shift();

    // 二行目以降の配列を取得
    const dataItems = dataRange;

    // オブジェクトを作成
    const result = dataItems.map(item => {
      let data = {};
      dataKeys.forEach((key, index) => {
        data[key] = item[index];
      });
      return data;
    });

    return result;
  }

  /**
   * シート名を指定して挿入
   * @param {String} name シート名
   * @param {String} insertType 挿入方法
   * @return 挿入したスプレッドシートのシートオブジェクト
   */
  insertSheet(name, insertType = '') {
    // 既に指定したシート名の処理があるかチェック
    const targetSheet = this.getSheetByName(name);
    if (targetSheet) {
      if (insertType === 'always') {
        // 挿入方法「常に挿入」の場合
        this.deleteSheet(name);
      } else if (insertType === 'confirm') {
        // 挿入方法「確認後挿入」の場合
        const confirm = Browser.msgBox(
          `シート「${name}」はすでに存在します。上書きしますか？`,
          Browser.Buttons.OK_CANCEL
        );
        if (confirm === 'cancel') return;
        this.deleteSheet(name);
      }
      else {
        // 挿入方法「未指定」の場合
        return;
      }
    }
    // 指定した名前でシートを挿入
    const insertSheet = this.app.insertSheet(name, 0);
    return insertSheet;
  }

  /**
   * シート名を指定して削除
   * @param {String} name シート名
   */
  deleteSheet(name) {
    // 対象のシートを取得
    const sheet = this.getSheetByName(name);
    if (sheet) {
      this.app.deleteSheet(sheet);
    }
  }
}
