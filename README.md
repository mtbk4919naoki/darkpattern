# ダークパターン事例イラスト集（静的サイト）

[消費者庁の調査ページ](https://www.caa.go.jp/policies/future/icprc/research_010)で公開されている資料（ダークパターン事例イラスト集など）を参考に、目次1ページと事例①〜⑮の15ページで閲覧できる学習用サンプルです。**個人作成**であり、消費者庁の公式見解ではありません。

## 構成

- `index.html` — 目次・但書
- `cases/01.html` … `cases/15.html` — 各事例（概要 / 操作できるダークパターン / 操作できる改善例 / 解説）
- 左サイドバー — 全ページ共通のグローバルナビ（目次・事例①〜⑮）
- 事例ページ — 切替タブをコンテンツ **上部と下部** に配置（同期）
- `css/style.css` — 共通スタイル（Open Props と `tokens.css` を読み込む）
- `css/tokens.css` — デザイントークン
- `css/case-mocks.css` — 事例②〜⑮で共用する操作モック部品
- `js/case-tabs.js` — タブ切替（上下同期）
- `js/case-mocks.js` — モックの表示切替・手順移動・結果表示・タイマー
- `js/sidebar.js` — 狭い画面でのサイドバー開閉
- `assets/img/` — イラスト（PDF 由来の `illust-*.png`、改善例用 `good-*.png`）
- `DESIGN.md` — デザインシステム（色・文字・余白とコンポーネントの使い方）
- `AGENTS.md` — AI エージェント向けの構築ルールとチェック手順

ビルドツールは不要です（HTML + CSS + 軽量 JS）。CSS の土台に [Open Props](https://open-props.style/) を同梱しています。

## ローカルで表示

```bash
cd darkpattern
python3 -m http.server 8080
```

ブラウザで http://localhost:8080/ を開きます。

## 改善例イラストの追加

事例ごとに `assets/img/NN/` に配置します。

```text
assets/img/01/
  illust-1.png   … ダークパターン（既存）
  good-1.png     … 改善例（追加時）
```

`cases/NN.html` の `#panel-good` 内に `<figure><img src="../assets/img/NN/good-1.png" alt="…"></figure>` を追記してください。

全事例が **概要**（PDF 由来の説明・イラスト）、**ダークパターン事例**（操作できるモック）、**改善例**（操作できる改善モック）の3タブ構成です。タブへは `#overview` / `#dark` / `#good` で直接リンクできます。

## 出典

参考資料: [いわゆる『ダークパターン』に関する取引の実態調査](https://www.caa.go.jp/policies/future/icprc/research_010)（消費者庁）
