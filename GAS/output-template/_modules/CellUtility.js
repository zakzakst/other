/**
 * セル汎用処理のクラス
 */
class CellUtility {
  constructor() {
    this.styles = {
      heading: {
        color: '#fff',
        weight: 'bold',
        bg: '#333',
        border: '#000',
      },
      subHeading: {
        color: '#fff',
        weight: 'normal',
        bg: '#666',
        border: '#000',
      },
      value: {
        color: '#000',
        weight: 'normal',
        bg: '#fff',
        border: '#000',
      },
    };
  }

  /**
   * セルの文言・スタイルを設定
   * @param range セル範囲オブジェクト
   * @param {String} style スタイル
   */
  setStyle(range, style) {
    range
      .setFontColor(this.styles[style].color)
      .setFontWeight(this.styles[style].weight)
      .setBackground(this.styles[style].bg)
      .setBorder(
        true,
        true,
        true,
        true,
        true,
        true,
        this.styles[style].border,
        SpreadsheetApp.BorderStyle.SOLID
      )
      .setVerticalAlignment('top');
  }
}
