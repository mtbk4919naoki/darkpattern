# AGENTS.md

## プロジェクト

[消費者庁の調査ページ](https://www.caa.go.jp/policies/future/icprc/research_010)で公開されている「ダークパターン事例イラスト集」を参考に、講義・学習用のサンプルとして個人で作っている静的サイトです。消費者庁が作ったものではありません。文言で消費者庁の公式資料のように見せないでください。

- 目次 `index.html` と、事例①〜⑮の `cases/01.html`〜`cases/15.html`
- 事例ページは「概要 / ダークパターン事例 / 改善例」の切替タブと、常時表示の解説で構成する
- 事例①〜⑮のすべてに、事例固有のダークパターンモック・改善モック・解説を実装済み

## 必読

- `DESIGN.md` — 見た目を変える作業の前に必ず読む。色・文字・余白・角丸と、コンポーネントの使い方の正本

## 技術構成

- HTML + CSS + 素の JavaScript。ビルドなし、npm 依存なし
- CSS の土台は [Open Props](https://open-props.style/) v1.7.23（`css/vendor/open-props.min.css` に同梱）
- 読み込み順: `css/style.css` の先頭で `vendor/open-props.min.css` → `tokens.css` を `@import` している。HTML からは `style.css`（と必要なら `case-NN-mock.css`）だけを読み込む

```text
css/
  vendor/open-props.min.css  外部ライブラリ。編集しない
  tokens.css                 Open Props を意味のある名前に置き換える層。色コードはここだけ
  style.css                  サイト共通のコンポーネント
  case-mocks.css             事例②〜⑮で共用する操作モック部品
  case-NN-mock.css           事例 NN の操作モック専用
js/
  case-tabs.js               切替タブ（上下2か所を同期、URL の #overview / #dark / #good に対応）
  sidebar.js                 狭い画面でのサイドバー開閉
  case-mocks.js              共通モックの結果表示、開閉、手順移動、タイマー
  case-NN-mock.js            事例 NN の操作モック専用
assets/img/NN/
  illust-*.png               PDF から抽出したイラスト
  good-*.png                 改善例の画像（追加するとき）
```

## ローカル確認

```bash
python3 -m http.server 8080
```

http://localhost:8080/ を開く。

## デザインのルール

- 色・余白・角丸・文字サイズは `tokens.css` の変数（`--color-*`、`--space-*`、`--radius-*`、`--text-*`）で指定する
- フラットデザインにする。`box-shadow` / `text-shadow` は使わず、境界線と背景色で区切る
- `tokens.css` 以外の CSS に色コードを書かない
- コンポーネントの CSS から Open Props の変数（`--indigo-8`、`--size-3` など）を直接参照しない
- 新しい値が必要になったら、先に `DESIGN.md` の YAML と本文、`tokens.css` の3か所に足してから使う
- 赤（`--color-dark`）はダークパターン、緑（`--color-good`）は改善例の意味でだけ使う
- 動きを付けるときは `prefers-reduced-motion: reduce` で止める指定も書く

## 事例ページの組み立てルール

新しいタブやモックを追加するときは、共通部品を使う事例②〜⑮を手本にする。事例①の専用CSS/JSは初期プロトタイプとして残している。

- サイドバーは全ページ同じリストを持ち、現在のページのリンクに `aria-current="page"` を付ける
- 切替タブ `.view-tabs` は h1 の直後と、解説の後（前後ナビの前）の2か所に置く。下部のタブには `id` を付けない
- タブのボタンに `data-tab="overview|dark|good"` を付け、対応するパネルの id は `panel-overview` / `panel-dark` / `panel-good` にする
- 最初に表示するパネル以外には `hidden` を付ける
- 概要パネルには PDF 由来の定義文（`.definition`）、例（`.examples`）、イラスト（`.figures`）を入れる
- ダークパターン / 改善例パネルの操作モックは `.demo-window` で囲み、`case-mocks.css` / `case-mocks.js` の `.demo-*` 共通部品を優先する
- 共通部品で表現できない場合だけ `case-NN-mock.css` / `case-NN-mock.js` を追加し、専用クラス名を `.mock-` で始める
- 解説 `.commentary` はタブの外に置き、どのタブでも表示されるようにする
- 未作成の部分は `.placeholder` で示す

## 作業後のチェック

すべて何も出力されなければ合格です。

```bash
# tokens.css 以外に色コードがない
rg -n '#[0-9a-fA-F]{3,8}\b' css --glob '!**/tokens.css' --glob '!**/vendor/**'

# 影を使っていない
rg -n 'shadow' css --glob '!**/vendor/**'

# Open Props の変数を直接参照していない
rg -n 'var\(--(gray|indigo|red|green|orange|yellow|size|radius|shadow|font-size|font-weight|font-lineheight|ease)-[0-9]' css --glob '!**/tokens.css' --glob '!**/vendor/**'
```

`DESIGN.md` を変えたときは、エラー・警告が 0 件になることを確認します。

```bash
npx @google/design.md lint DESIGN.md
```

## 確認してから行うこと

- npm パッケージやビルドツールの追加
- Open Props 以外の CSS フレームワークの追加、Open Props の版の変更
- 既存のイラスト（`assets/img/*/illust-*.png`）の差し替えや削除

## 文章

- サイトの文言と文書は日本語で書く
- 特定の実在企業・サービスを名指ししない。モックのお店は架空にする（例: `example-shop.jp`）
