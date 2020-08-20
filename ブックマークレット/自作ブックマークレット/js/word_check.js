function data() {
  var bodyEl = document.body;
  var str = [
    "０","１","２","３","４","５","６","７","８","９",
    "Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ","ａ","ｂ","ｃ","ｄ","ｅ","ｆ",
    "ｇ","ｈ","ｉ","ｊ","ｋ","ｌ","ｍ","ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ","ｕ","ｖ","ｗ","ｘ","ｙ","ｚ",
    "指定",
    "JavaScript",
    "。",
    "康和",
    "あ"
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
    alert("ワードは検出されませんでした");
  } else {
    // alert(count + 'ワードが検出されました');
  }

  function wordCheck(reg, str){
    var txt = bodyEl.innerHTML;
    //マッチした場合、置き換え
    if(txt.match(reg)){
      bodyEl.innerHTML = txt.replace(reg,"<b style='background:#FFFF00;display:inline-block;font-weight:bold;'>"+str+"</b>");
      return true;
    } else {
      return false;
    }
  };
}

data();
