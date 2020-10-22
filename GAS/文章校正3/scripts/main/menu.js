function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('ブックマークレット用シート作成');
  config.bookmarkletList.forEach(function(bookmarklet) {
    menu.addItem(bookmarklet.name, bookmarklet.sheetMake);
  });
  menu.addToUi();
}
