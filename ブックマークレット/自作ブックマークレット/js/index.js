/**
 * クリップボードにコピー
 */
function copyClipboard() {
  var url = location.href;
  var input = prompt('○○を入力して下さい', 'デフォルト文字列');
  var element = document.querySelector('#js-select-box') ? document.querySelector('#js-select-box').value : '';
  var template = [
    `【クリップボードにコピー】`,
    `下記のようにページ内の情報から文章を作成し、クリップボードにコピーします。`,
    `※利用シーン：定型メール・メッセージの自動作成`,
    ``,
    `==================================`,
    `このページのURLは「${url}」です。`,
    `確認ダイアログには「${input}」と入力しました。`,
    `セレクトボックスは「${element}」が選択されています。`,
    `==================================`,
  ];
  var copyText = template.join('\n');
  setTimeout(() => {
    navigator.clipboard.writeText(copyText).then(function () {
      alert('クリップボードにコピーしました');
    }, function () {
      alert('コピーに失敗しました');
    });
  }, 400);
}


/**
 * HTMLの情報を表示
 */
function htmlInfo() {
  var title = document.title;
  var description = document.getElementsByName('description')[0].content;
  var element = document.querySelector('#js-select-box') ? document.querySelector('#js-select-box').value : '';
  var template = [
    `【HTMLの情報を表示】`,
    `※利用シーン：HTMLが不慣れな人が内容を確認する際の補助`,
    ``,
    `==================================`,
    `このページのタイトルは「${title}」です。`,
    `このページのディスクリプションは「${description}」です。`,
    `セレクトボックスは「${element}」が選択されています。`,
    `==================================`,
  ];
  var copyText = template.join('\n');
  alert(copyText);
}


/**
 * 外部のJSを実行
 */
function externalJs() {
  var bodyEl = document.body;
  var scriptEl = document.createElement('script');
  scriptEl.src = 'js/word_check.js';
  bodyEl.appendChild(scriptEl);
}


/**
 * ドメインの切り替え
 */
function domainChange() {
  var domains = [
    {production:'127.0.0.1:5500', test:'test.com'},
    // {production:'hoge.example.com', test:'poge.example.com'},
  ];
  for(var service of domains ) {
    if(location.host == service['production']) {
      location.href = location.href.replace(service['production'], service['test']);
      break;
    } else if(location.host == service['test']) {
      location.href = location.href.replace(service['test'], service['production']);
      break;
    }
  }
}


/**
 * 文言をハイライト
 */
function wordHighlight() {
  var bodyEl = document.body;
  var str = [
    '０','１','２','３','４','５','６','７','８','９',
    'Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ','Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ','ａ','ｂ','ｃ','ｄ','ｅ','ｆ',
    'ｇ','ｈ','ｉ','ｊ','ｋ','ｌ','ｍ','ｎ','ｏ','ｐ','ｑ','ｒ','ｓ','ｔ','ｕ','ｖ','ｗ','ｘ','ｙ','ｚ',
    '指定',
    'JavaScript',
    '。',
    '康和',
    'あ'
  ];
  var count = 0;
  //指定ワードのループ
  for(var i = 0; i < str.length; i++){
    var reg = new RegExp(str[i], 'g');
    var checkResult = wordCheck(reg, str[i]);
    if(checkResult) {
      count++;
    }
  }
  //検出判定 countは種類を検知する
  if(count === 0) {
    alert('ワードは検出されませんでした');
  } else {
    // alert(count + 'ワードが検出されました');
  }
  function wordCheck(reg, str){
    var txt = bodyEl.innerHTML;
    //マッチした場合、置き換え
    if(txt.match(reg)){
      bodyEl.innerHTML = txt.replace(reg,`<b style='background:#FFFF00;display:inline-block;font-weight:bold;'>${str}</b>`);
      return true;
    } else {
      return false;
    }
  };
}


/**
 * 文言をハイライト2
 */
function wordHighlight2() {
  var bodyEl = document.body;
  var checks = [
    ['JS|ＪＳ', 'JavaScript', '省略せずに表記してください\n※ライブラリ名に利用されている場合は省略も可'],
    ['\\d{4,}', '1,234', '4桁以上の数字にはカンマを入れてください'],
    ['０', '0', '半角文字を利用してください'],
  ];
  var count = 0;
  //指定ワードのループ
  for(var i = 0; i < checks.length; i++){
    var check = checks[i];
    var checkResult = wordCheck(check);
    if(checkResult) {
      count++;
    }
  }
  //検出判定 countは種類を検知する
  if(count === 0) {
    alert('ワードは検出されませんでした');
  } else {
    // alert(count + 'ワードが検出されました');
  }
  function wordCheck(check){
    var reg = new RegExp('(' + check[0] + ')', 'g');
    var str = check[1];
    var note = check[2];
    var txt = bodyEl.innerHTML;
    var styleStr = 'background:#ffcccc; display:inline-block; font-weight:bold; cursor:pointer; margin:0 2px; padding:0 4px; border-radius: 2px;';
    //マッチした場合、置き換え
    if(txt.match(reg)){
      bodyEl.innerHTML = txt.replace(reg,`<b style=\'${styleStr}\' title=\'【推奨文言：${str}】\n${note}\'>$1</b>`);
      return true;
    } else {
      return false;
    }
  }
}


/**
 * フォームに情報を入力
 */
function formInput() {
  var targetInput = document.querySelector('#js-form-input');
  var selectBoxId = 'my-input__selectbox';
  var textId = 'my-input__text';
  var actionBtnId = 'my-btn__action';
  var cancelBtnId = 'my-btn__cancel';

  showModal();

  function showModal() {
    var style = `
    .my-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99999;
    }
    .my-input__modal {
      padding: 12px;
      background: #fff;
      border-radius: 4px;
    }
    `;
    var html = `
    <div class='my-input__modal'>
      <select id='${selectBoxId}'>
        <option value='select1'>選択肢1</option>
        <option value='select2'>選択肢2</option>
        <option value='select3'>選択肢3</option>
      </select>
      <input type='text' id='${textId}'>
      <button id='${actionBtnId}'>実行</button>
      <button id='${cancelBtnId}'>キャンセル</button>
    </div>
    `;
    // styleタグを挿入
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = style;
    document.getElementsByTagName('head').item(0).appendChild(styleTag);
    // フォームHTMLを挿入
    var htmlTag = document.createElement('div');
    htmlTag.classList.add('my-overlay');
    htmlTag.innerHTML = html;
    document.body.appendChild(htmlTag);
    // クリックイベントを登録
    setAction(htmlTag, styleTag);
  }

  function closeModal(htmlTag, styleTag) {
    htmlTag.parentNode.removeChild(htmlTag);
    styleTag.parentNode.removeChild(styleTag);
  }

  function setAction(htmlTag, styleTag) {
    actionBtnEl = document.getElementById(actionBtnId);
    cancelBtnEl = document.getElementById(cancelBtnId);
    actionBtnEl.addEventListener('click', () => {
      inputAction();
      closeModal(htmlTag, styleTag);
    });
    cancelBtnEl.addEventListener('click', () => {
      closeModal(htmlTag, styleTag);
    });
  }

  function inputAction() {
    selectBoxValue = document.getElementById(selectBoxId).value;
    textValue = document.getElementById(textId).value;
    targetInput.value = `
    【テキストを出力】\n
    セレクトボックス：${selectBoxValue}\n
    テキスト入力：${textValue}
    `;
  }
}
