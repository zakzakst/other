//�����Q�lURL����
//https://sakura-editor.github.io/help/HLP000268.html
//https://sakura-editor.github.io/help/HLP000107.html
//https://sakura-editor.github.io/help/CNT000924.html
//http://sakura-editor.sourceforge.net/htmlhelp/HLP000089.html
//https://stabucky.com/wp/archives/4678

// �����T���v��3����
//�E�^�O�̑}��
function tagInsert() {
  var selectText = GetSelectedString();
  var tagStr;
  tagStr = InputBox("�^�O����͂��Ă�������", "", 10);
  if(IsTextSelected() == 0) {
    InsText("<" + tagStr + ">" + "</" + tagStr + ">");
  }
  else if(IsTextSelected() == 1) {
    InsText("<" + tagStr + ">" + selectText + "</" + tagStr + ">");
  }
  else {
    MessageBox("��`�I�����������Ă�������");
  }
}


//�E���s�ύX
//���s��<br>�֕ύX
function nToBr() {
  ReplaceAll("[\r\n]+", "<br>", 132); //�I��͈͂̂݁i����I�����̓t�@�C���S�́j
  ReDraw();
}
//���s���폜
function nDelete() {
  ReplaceAll("[\r\n]+", "", 132); //�I��͈͂̂݁i����I�����̓t�@�C���S�́j
  ReDraw();
}
//���s�̖�����<br>��ǉ�
function nAddBr() {
  ReplaceAll("[\r\n]+", "<br>\r\n", 132); //�I��͈͂̂݁i����I�����̓t�@�C���S�́j
  ReDraw();
}


//�E�o�^������������������
function searchMultipleText() {
  var searchText = "��|13|����|[�P-�X]";
  SearchNext(searchText, 4);
}


//�E�����s�^�O�t��
function multipleTagInsert() {
  var tagStr;
  tagStr = InputBox("�^�O����͂��Ă�������", "", 10);
  
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


//�E��s�폜
function nullLineDelete() {
  ReplaceAll("^[ \t]*[\r\n]+", "", 132); //�I��͈͂̂�
  ReDraw();
}


//�E�O��̋󔒂��폜
function bothTrim() {
  LTrim();
  RTrim();
}


//�E�O��ɕ����}��
function multipleTextInsert() {
  var beforeStr;
  var afterStr;
  beforeStr = InputBox("�擪�ɑ}�����镶������͂��Ă�������", "", 20);
  afterStr = InputBox("�����ɑ}�����镶������͂��Ă�������", "", 20);
  
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


//�E�����ɓ��t��t���ĕۑ�
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
    MessageBox("��x�ʏ�̕ۑ������Ă�������");
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




//�E���j���[��\��
createMenuTest();
function createMenuTest() {
  var menuList;
  var menuSelect;
  
  menuList = "\
�^�O�̑}��,\
[S]���s�ύX,\
���s��<br>�֕ύX,\
���s���폜,\
[E]���s�̖�����<br>��ǉ�,\
�o�^������������������,\
�����s�^�O�t��,\
��s�폜,\
�O��̋󔒂��폜,\
�O��ɕ����}��,\
�����ɓ��t��t���ĕۑ�";
  
  menuSelect = CreateMenu(0, menuList);
  switch(menuSelect) {
    case 1: //�^�O�̑}��
      tagInsert();
      break;
      
    case 2: //���s��<br>�֕ύX
      nToBr();
      break;
      
    case 3: //���s���폜
      nDelete();
      break;
      
    case 4: //���s�̖�����<br>��ǉ�
      nAddBr();
      break;
      
    case 5: //�o�^������������������
      searchMultipleText();
      break;
      
    case 6: //�����s�^�O�t��
      multipleTagInsert();
      break;
      
    case 7: //��s�폜
      nullLineDelete();
      break;
      
    case 8: //�O��̋󔒂��폜
      bothTrim();
      break;
      
    case 9: //�O��ɕ����}��
      multipleTextInsert();
      break;
      
    case 10: //�����ɓ��t��t���ĕۑ�
      fileSaveWithDate();
      break;
      
    default:
      MessageBox("���ڂ��I������܂���ł���");
      break;
  }
}