function onOpen() {
  const main = new Main(config);
  main.setMenu();
}

function menuContentOutput() {
  const main = new Main(config);
  main.menuContentOutput();
}

function menuContentSheetInit() {
  const main = new Main(config);
  main.menuContentSheetInit();
}

class Main {
  constructor(config) {
    // シート変数設定
    this.spId = config.spId;
    this.dataSheetName = config.dataSheetName;
    this.settingSheetName = config.settingSheetName;
    // メニュー変数設定
    this.menuName = 'テンプレート出力';
    this.menuItems = [
      {
        label: '出力',
        name: 'menuContentOutput'
      },
      {
        label: 'シート初期化',
        name: 'menuContentSheetInit'
      },
    ];
  }

  /**
   * メニュー設定
   */
  setMenu() {
    const menu = new Menu(this.menuName, this.menuItems);
    menu.init();
  }

  /**
   * テンプレート出力
   */
  menuContentOutput() {
    // 設定シートの内容を取得
    const spUtil = new SPUtility(this.spId);
    const settingSheet = spUtil.getSheetByName(this.settingSheetName);
    const driveId = settingSheet.getRange('B1').getValue();
    const template = settingSheet.getRange('B2').getValue();
    const addDate = settingSheet.getRange('B3').getValue();
    const dataType = settingSheet.getRange('B4').getValue();

    // データシートの内容を取得
    const data = spUtil.getDataFromSheetData(this.dataSheetName);

    // 出力実行
    const output = new Output(
      driveId,
      data,
      template,
      addDate,
      dataType
    );
    output.outputFiles();
  }

  /**
   * シート初期化
   */
  menuContentSheetInit() {
    // 設定シートを作成
    this.makeSettingSheet();
    // 設定シートを作成
    this.makeDataSheet();
  }

  /**
   * 設定シート作成
   */
  makeSettingSheet() {
    const spUtil = new SPUtility(this.spId);
    const cellUtil = new CellUtility();
    const settingSheet = spUtil.insertSheet(this.settingSheetName, 'confirm');
    // 見出しのスタイルを作成
    const headingRange = settingSheet.getRange(1, 1, 4, 1);
    cellUtil.setStyle(headingRange, 'heading');
    // 値のスタイルを作成
    const valueRange = settingSheet.getRange(1, 2, 4, 1);
    cellUtil.setStyle(valueRange, 'value');
    // セルの値を入力
    settingSheet.getRange('A1').setValue('出力ドライブID');
    settingSheet.getRange('A2').setValue('テンプレート');
    settingSheet.getRange('B2').setValue('<<<項目1>>>\n<<<項目2>>>\n<<<項目3>>>\n<<<項目4>>>');
    settingSheet.getRange('A3').setValue('ファイル名末尾に日付を付与');
    settingSheet.getRange('B3').insertCheckboxes();
    settingSheet.getRange('A4').setValue('出力ファイルタイプ');
    const mimeTypes = [
      'PLAIN_TEXT',
      'HTML',
      'JAVASCRIPT'
    ];
    settingSheet.getRange('B4').setDataValidation(
      SpreadsheetApp
        .newDataValidation()
        .setAllowInvalid(false)
        .requireValueInList(mimeTypes, true)
        .build()
    );
    settingSheet.getRange('B4').setValue(mimeTypes[0]);
    // セルのサイズを設定
    settingSheet.autoResizeColumn(1);
    settingSheet.setColumnWidth(2, 300);
    settingSheet.setRowHeight(2, 200);
  }

  /**
   * データ入力シート作成
   */
  makeDataSheet() {
    const spUtil = new SPUtility(this.spId);
    const cellUtil = new CellUtility();
    const dataSheet = spUtil.insertSheet(this.dataSheetName, 'confirm');
    // 見出しのスタイルを作成
    const headingRange = dataSheet.getRange(1, 1, 1, 5);
    cellUtil.setStyle(headingRange, 'heading');
    // サブ見出しのスタイルを作成
    const subHeadingRange = dataSheet.getRange(2, 1, 3, 1);
    cellUtil.setStyle(subHeadingRange, 'subHeading');
    // 値のスタイルを作成
    const valueRange = dataSheet.getRange(2, 2, 3, 4);
    cellUtil.setStyle(valueRange, 'value');
    // セルの値を入力
    dataSheet.getRange('A1').setValue('ファイル名');
    dataSheet.getRange('B1').setValue('項目1');
    dataSheet.getRange('C1').setValue('項目2');
    dataSheet.getRange('D1').setValue('項目3');
    dataSheet.getRange('E1').setValue('項目4');
  }
}
