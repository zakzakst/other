function onOpen() {
  var ui = DocumentApp.getUi();
  var menu = ui.createMenu('文章校正');
  menu.addItem('文章校正を実行', 'proofreading');
  menu.addItem('ハイライトをクリア', 'clearProofreading');
  menu.addToUi();
}
