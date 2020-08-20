//■■参考URL■■
//https://sakura-editor.github.io/help/HLP000268.html
//https://sakura-editor.github.io/help/HLP000107.html
//https://sakura-editor.github.io/help/CNT000924.html
//http://sakura-editor.sourceforge.net/htmlhelp/HLP000089.html
//https://stabucky.com/wp/archives/4678

// ■■サンプル3■■
//・タグの挿入
function tagInsert() {
  var selectText = GetSelectedString();
  var tagStr;
  tagStr = InputBox("タグを入力してください", "", 10);
  if(IsTextSelected() == 0) {
    InsText("<" + tagStr + ">" + "</" + tagStr + ">");
  }
  else if(IsTextSelected() == 1) {
    InsText("<" + tagStr + ">" + selectText + "</" + tagStr + ">");
  }
  else {
    MessageBox("矩形選択を解除してください");
  }
}


//・改行変更
//改行を<br>へ変更
function nToBr() {
  ReplaceAll("[\r\n]+", "<br>", 132); //選択範囲のみ（※非選択時はファイル全体）
  ReDraw();
}
//改行を削除
function nDelete() {
  ReplaceAll("[\r\n]+", "", 132); //選択範囲のみ（※非選択時はファイル全体）
  ReDraw();
}
//改行の末尾に<br>を追加
function nAddBr() {
  ReplaceAll("[\r\n]+", "<br>\r\n", 132); //選択範囲のみ（※非選択時はファイル全体）
  ReDraw();
}


//・登録した複数文言を検索
function searchMultipleText() {
  var searchText = "★|13|文字|[１-９]";
  SearchNext(searchText, 4);
}


//・複数行タグ付け
function multipleTagInsert() {
  var tagStr;
  tagStr = InputBox("タグを入力してください", "", 10);
  
  if(IsTextSelected() == 0) {
    SelectLine();
    Copy();
  } else {
    CopyLines();
  }
  
  var selectLines = GetClipboard();
  var lineArray = selectLines.split(/\r\n|\r|\n/);
  var resultLines = "";
  
  for(var i = 0; i < lineArray.length; i++) {
    resultLines += "<" + tagStr + ">" + lineArray[i] + "</" + tagStr + ">\n";
  }
  InsText(resultLines);
}


//・空行削除
function nullLineDelete() {
  ReplaceAll("^[ \t]*[\r\n]+", "", 132); //選択範囲のみ
  ReDraw();
}


//・前後の空白を削除
function bothTrim() {
  LTrim();
  RTrim();
}


//・前後に文言挿入
function multipleTextInsert() {
  var beforeStr;
  var afterStr;
  beforeStr = InputBox("先頭に挿入する文言を入力してください", "", 20);
  afterStr = InputBox("末尾に挿入する文言を入力してください", "", 20);
  
  if(IsTextSelected() == 0) {
    SelectLine();
    Copy();
  } else {
    CopyLines();
  }
  
  var selectLines = GetClipboard();
  var lineArray = selectLines.split(/\r\n|\r|\n/);
  var resultLines = "";
  
  for(var i = 0; i < lineArray.length; i++) {
    resultLines += beforeStr + lineArray[i] + afterStr + "\n";
  }
  InsText(resultLines);
}


//・末尾に日付を付けて保存
function fileSaveWithDate() {
  var filePath;
  var dateText;
  var fileDate;
  var extensionPos;
  var newFilePath;
  
  if(GetFilename() !== "") {
    CopyPath();
    filePath = getClipboard();
  } else {
    MessageBox("一度通常の保存をしてください");
    return
  }
  
  dateText = new Date();
  var y = dateText.getFullYear();
  var m = ("00" + (dateText.getMonth() + 1)).slice(-2);
  var d = ("00" + dateText.getDate()).slice(-2);
  fileDate = "_" + y + m + d;
  
  extensionPos =filePath.lastIndexOf(".");
  newFilePath = filePath.slice(0, extensionPos) + fileDate + filePath.slice(extensionPos);
  FileSaveAs(newFilePath, 0, 0);
  FileSaveAs(filePath, 0, 0);
}




//・メニューを表示
createMenuTest();
function createMenuTest() {
  var menuList;
  var menuSelect;
  
  menuList = "\
タグの挿入,\
[S]改行変更,\
改行を<br>へ変更,\
改行を削除,\
[E]改行の末尾に<br>を追加,\
登録した複数文言を検索,\
複数行タグ付け,\
空行削除,\
前後の空白を削除,\
前後に文言挿入,\
末尾に日付を付けて保存";
  
  menuSelect = CreateMenu(0, menuList);
  switch(menuSelect) {
    case 1: //タグの挿入
      tagInsert();
      break;
      
    case 2: //改行を<br>へ変更
      nToBr();
      break;
      
    case 3: //改行を削除
      nDelete();
      break;
      
    case 4: //改行の末尾に<br>を追加
      nAddBr();
      break;
      
    case 5: //登録した複数文言を検索
      searchMultipleText();
      break;
      
    case 6: //複数行タグ付け
      multipleTagInsert();
      break;
      
    case 7: //空行削除
      nullLineDelete();
      break;
      
    case 8: //前後の空白を削除
      bothTrim();
      break;
      
    case 9: //前後に文言挿入
      multipleTextInsert();
      break;
      
    case 10: //末尾に日付を付けて保存
      fileSaveWithDate();
      break;
      
    default:
      MessageBox("項目が選択されませんでした");
      break;
  }
}