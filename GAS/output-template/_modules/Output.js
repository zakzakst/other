/**
 * ファイル出力用のクラス
 * @param {String} driveId Google DriveのID
 * @param {Object} data テンプレートに入れ込むデータ
 * @param {String} template テンプレート
 * @param {Boolean} addDate ファイル名の末尾に日時を付けるか
 * @param {String} dataType 出力ファイルの形式
 */
class Output {
  constructor(
    driveId,
    data,
    template,
    addDate = false,
    dataType = 'PLAIN_TEXT'
  ) {
    this.folder = DriveApp.getFolderById(driveId);
    this.data = data;
    this.template = template;
    this.addDate = addDate;
    this.dataType = dataType;
  }

  /**
   * ファイル出力
   */
  outputFiles() {
    this.data.forEach(item => {
      this.outputFile(item);
    });
    // 全てのファイル出力後にメッセージを表示
    Browser.msgBox('ファイルの出力が完了しました');
  }

  /**
   * ファイル出力（1ファイル）
   * @param {Object} data テンプレートに入れ込むデータ
   */
  outputFile(data) {
    const fileName = this.makeFileName(data['ファイル名']);
    delete data['ファイル名'];
    const content = this.makeContent(data);
    // ファイルを出力
    this.folder.createFile(
      fileName,
      content,
      MimeType[this.dataType]
    );
  }

  /**
   * 出力内容作成
   * @param {Object} data テンプレートに入れ込む内容のデータ
   * @return {String} 出力内容
   */
  makeContent(data) {
    let result = this.template;
    Object.keys(data).forEach(item => {
      const regexp = new RegExp('<<<' + item + '>>>', 'g');
      result = result.replace(regexp, data[item]);
    });
    return result;
  }

  /**
   * ファイル名作成
   * @param {String} fileName 元となるファイル名
   * @return {String} ファイル名
   */
  makeFileName(fileName) {
    // 末尾に日時を付けない場合はそのまま返す
    if (!this.addDate) return fileName;
    const date = new Date();
    const year = date.getFullYear();
    const month = ('00' + (date.getMonth() + 1)).slice(-2);
    const day = ('00' + date.getDate()).slice(-2);
    const hour = ('00' + date.getHours()).slice(-2);
    const minute = ('00' + date.getMinutes()).slice(-2);
    const second = ('00' + date.getSeconds()).slice(-2);
    // テキスト結合のための配列を作成
    const textArr = [
      fileName,
      year,
      month,
      day,
      hour,
      minute,
      second,
    ]
    return textArr.join('_');
  }
}
