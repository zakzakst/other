function testMakeData() {
  const spId = '1J0ZhtZKWBttlLjej3SkVWSyTdtIc2nJX8MuFiEb-fkE';
  const driveId = '10yCzWxVOQwHxhazsSgo1LsNXUALB2vuF';
  const spUtil = new SPUtility(spId);
  const data = spUtil.getDataFromSheetData('シート1');
  const template = '項目1：<<<test1>>>／項目1：<<<項目1>>>／項目2：<<<test2>>>';

  const output = new Output(
    driveId,
    data,
    template,
    true,
    'PLAIN_TEXT'
  );
  output.outputFiles();
}

function testSheetUtility() {
  const spId = '1J0ZhtZKWBttlLjej3SkVWSyTdtIc2nJX8MuFiEb-fkE'
  const spUtil = new SPUtility(spId);
  // const sheetUtil = new SheetUtility(spUtil.getSheetByNum(0));
  console.log(spUtil.getDataFromSheetData('シート1'));
  // console.log(sheetUtil.getDataFromSheetData());
}

function testMakeObject() {
  const util = new SheetUtility('test');
  const dataRange = [
    ['項目1', '項目2', '項目3'],
    ['1-1', '1-2', '1-3'],
    ['2-1', '2-2', '2-3'],
    ['3-1', '3-2', '3-3'],
  ];
  util.makeData(dataRange);
}

function testOutputFile() {
  const driveId = '10yCzWxVOQwHxhazsSgo1LsNXUALB2vuF';
  const data = [
    {
      fileName: 'test',
      content: [
        '入れ替え文言1',
        '入れ替え文言2',
        '入れ替え文言3'
      ],
    }
  ];
  const template = '<<<1>>>';

  const output = new Output(
    driveId,
    data,
    template,
    true,
    'PLAIN_TEXT'
  );
  output.outputFiles();
}
