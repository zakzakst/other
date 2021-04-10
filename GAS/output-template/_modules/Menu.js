/**
 * メニュー設定用のクラス
 * @param {String} menuName メニュー表示名
 * @param {Array} menuItems メニュー項目名・実行スクリプト名
 */
class Menu {
  constructor(menuName, menuItems) {
    const ui = SpreadsheetApp.getUi();
    this.menu = ui.createMenu(menuName);
    this.menuItems = menuItems;
  }

  /**
   * 初期化
   */
  init() {
    this.setMenuItems();
  }

  /**
   * メニュー項目設定
   */
  setMenuItems() {
    this.menuItems.forEach(item => {
      this.menu.addItem(item.label, item.name);
    });
    this.menu.addToUi();
  }
}
