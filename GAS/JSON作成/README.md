# JSON作成スクリプト

## 機能
- **JSONデータの取得**<br>スプレッドシートに入力した内容からJSONデータを作成し、「ファイルダウンロード ／ クリップボードにコピー」する<br>※データ作成の際には「開いているシート全体」と「選択中の範囲」のどちらを参照するか選べる

## 初期化の手順
1. claspのログイン：`clasp login`
1. 対象のGASをクローン：`clasp clone <script id>`
1. scripts/config.jsの項目を入力
1. 設定を反映：`clasp push`

## 各ファイルの内容
| ファイル名 | 内容 |
|:-----------|:-----------|
| scripts/config.js | プロジェクトの各種値の設定 |
| scripts/menu.js | スプレッドシートでのメニュー表示 |
| scripts/sheetMake.js | 入力用スプレッドシートを作成 |
| scripts/view.js | JSON作成ダイアログを表示 |
| scripts/utility.js | 汎用スクリプト |
| html/makejson.html | JSON作成ダイアログHTMLのテンプレート |
| html/style.html | スタイルの適用 |
| html/script.html | JSON作成用スクリプト |

## スプレッドシート追加メニューの内容
| メニュー名 | 内容 |
|:-----------|:-----------|
| シート全体からJSON作成 | 現在のシート全体のデータを参照してJSONを作成 |
| 選択範囲からJSON作成 | 選択範囲のデータを参照してJSONを作成 |
| 新規シート作成 | データ入力用のフォーマットシートを作成<br>※サンプルフォーマットのため、別の形式のシートを利用してもJSON作成できます |
