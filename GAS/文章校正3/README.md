# 文章校正スクリプト3

## 機能
- **文言校正ブックマークレットの実行用データ作成**<br>スプレッドシートに入力した内容から参照用JSONを作成する
- **ブックマークレット登録用ページ**<br>ドラッグ＆ドロップでブックマークレット登録ができるページを表示

## 初期化の手順
1. claspのログイン：`clasp login`
1. 対象のGASをクローン：`clasp clone <script id>`
1. scripts/config.jsの項目を入力
1. 設定を反映：`clasp push`

## 登録用ページの表示
公開アプリのURL末尾に `?type=page` を付けてアクセスする

## 各ファイルの内容
| ファイル名 | 内容 |
|:-----------|:-----------|
| scripts/main/config.js | プロジェクトの各種値の設定 |
| scripts/main/main.js | 公開URLアクセス時の処理 |
| scripts/main/menu.js | スプレッドシートでのメニュー表示 |
| scripts/main/utility.js | 汎用スクリプト |
| scripts/bookmarklet/highlightFunc/sheetMake.js | 入力用スプレッドシートを作成 |
| scripts/bookmarklet/highlightFunc/getData.js | スプレッドシートの入力内容から文章校正データを取得して返す |
| html/bookmarklet.html | ブックマークレット登録用ページのテンプレート |

## スプレッドシート追加メニューの内容
| メニュー名 | 内容 |
|:-----------|:-----------|
| ブックマークレット用シート作成 | 文章校正データのフォーマットシートを作成 |
