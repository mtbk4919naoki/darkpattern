---
version: alpha
name: ダークパターン事例集
description: 講義・学習用に、ダークパターンと改善例を見比べるための静かで読みやすいデザインシステム。
colors:
  primary: "#3b5bdb"
  primary-strong: "#364fc7"
  primary-soft: "#edf2ff"
  on-primary: "#ffffff"
  neutral: "#f1f3f5"
  surface: "#ffffff"
  surface-muted: "#f8f9fa"
  border: "#dee2e6"
  border-strong: "#ced4da"
  on-surface: "#212529"
  on-surface-muted: "#495057"
  dark: "#c92a2a"
  dark-soft: "#fff5f5"
  good: "#237a36"
  good-soft: "#ebfbee"
  mock-accent: "#c2410c"
  mock-accent-strong: "#9a3412"
typography:
  headline-lg:
    fontFamily: Hiragino Sans
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.25
  headline-md:
    fontFamily: Hiragino Sans
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.25
  body-lg:
    fontFamily: Hiragino Sans
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.75
  body-md:
    fontFamily: Hiragino Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  label-md:
    fontFamily: Hiragino Sans
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.25
  caption:
    fontFamily: Hiragino Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 5px
  md: 0.625rem
  lg: 1rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  sidebar: 16rem
  content: 46rem
components:
  page:
    backgroundColor: "{colors.neutral}"
  divider:
    backgroundColor: "{colors.border}"
  divider-strong:
    backgroundColor: "{colors.border-strong}"
  tab:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 0.5rem
  tab-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  tab-selected-dark:
    textColor: "{colors.dark}"
  callout-dark:
    backgroundColor: "{colors.dark-soft}"
    textColor: "{colors.dark}"
  tab-selected-good:
    textColor: "{colors.good}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 2rem
  callout-definition:
    backgroundColor: "{colors.primary-soft}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
  callout-commentary:
    backgroundColor: "{colors.surface-muted}"
    rounded: "{rounded.md}"
    padding: 1.5rem
  sidebar-link-active:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-strong}"
  button-mock-primary:
    backgroundColor: "{colors.mock-accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-mock-primary-hover:
    backgroundColor: "{colors.mock-accent-strong}"
  button-mock-loud:
    backgroundColor: "{colors.mock-accent}"
    textColor: "{colors.on-primary}"
  callout-source:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.caption}"
  mock-status-ok:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good}"
---

# ダークパターン事例集 デザインシステム

## Overview

講義や自習で「ダークパターン」と「改善例」を見比べるためのサイトです。主役はイラストと操作モックなので、サイト自体の見た目は静かに保ちます。

- 白いカードを薄いグレーの背景に置き、本文に集中させる
- 色は意味があるときだけ使う。青はリンクと選択状態、赤はダークパターン、緑は改善例
- フラットに作る。装飾は角丸と1pxの境界線まで。影・グラデーション・イラスト調の飾りは使わない

実装は [Open Props](https://open-props.style/) v1.7.23 の CSS 変数を土台にし、`css/tokens.css` で意味のある名前（`--color-primary` など）に置き換えて使います。ビルドは不要です。

## Colors

- **Primary（インディゴ `#3b5bdb`）:** リンク、選択中のサイドバー項目、改善モックの主ボタン。白背景でのコントラスト比 5.67:1
- **Primary soft（`#edf2ff`）:** 定義文の背景、選択中のサイドバー項目、番号バッジ
- **Neutral（`#f1f3f5`）:** ページ背景
- **Surface（`#ffffff`）/ Surface muted（`#f8f9fa`）:** カードと、その中の解説・タブ枠
- **On surface（`#212529`）/ muted（`#495057`）:** 本文と補足文。muted も白背景で 8.18:1 あるので本文にも使える
- **Dark（`#c92a2a`）:** 「ダークパターン事例」タブの選択色。警告の意味でだけ使う（白背景 5.46:1）
- **Good（`#237a36`）:** 「改善例」タブの選択色と、モックの成功メッセージ。Open Props の `green-9` は 4.37:1 で足りないため、少し暗い値を独自に定義している（白背景 5.37:1）
- **Mock accent（`#c2410c`）:** 操作モック内の「架空のお店」のブランド色。サイト本体では使わない（白文字で 5.18:1）

## Typography

日本語本文を読みやすくするため、Hiragino Sans → Noto Sans JP → システムフォントの順で指定します。

- **headline-lg:** ページの h1（事例名）
- **headline-md:** h2（【例】、解説 など）
- **body-lg:** 定義文。事例の要点なので一段大きく太くする
- **body-md:** 本文。行間 1.75 で詰めすぎない
- **label-md:** タブ、サイドバー、前後ナビ
- **caption:** フッター、モックのスクロール案内

ウェイトは 400 / 600 / 700 の3段階だけ使います。

## Layout

- 左に幅 16rem のサイドバー（全ページ共通のナビ）、右に最大幅 46rem の本文カード
- 768px 以下ではサイドバーを上に移し、「メニュー」ボタンで開閉する
- 余白は `--space-1`〜`--space-6`（0.25 / 0.5 / 1 / 1.5 / 2 / 3rem）の6段階だけ使う
- 事例ページの並び: h1 → 上部タブ → タブパネル → 解説 → 下部タブ → 前後ナビ

## Elevation & Depth

影は使いません。階層は背景色の段差（Neutral → Surface → Surface muted）と 1px の境界線（Border / Border strong）で表します。

- 本文カード、選択中のタブ、目次カード: Border の境界線
- 操作モックのブラウザ枠: Border strong の境界線と、グレーのアドレスバーで「画面の中の画面」と分かるようにする
- ホバー: 枠線のボタンとリンクは、境界線を Primary に、背景を Primary soft に変える。塗りつぶしボタンは同じ色を一段濃くする。浮き上がらせない

## Shapes

- `sm`（5px）: タブ、サイドバー項目、モック内のボタン
- `md`（0.625rem）: 定義文、解説、目次カード、画像、前後ナビ
- `lg`（1rem）: 本文カード
- `full`: 番号バッジ、モックの丸いドット

## Components

- **サイドバー（`.site-sidebar`）:** 目次と事例①〜⑮へのリンク。現在のページに `aria-current="page"` を付ける
- **目次カード（`.case-list`）:** 番号バッジ（`.case-num`）と事例名。自動で2列以上に並ぶ
- **注記（`.note`）:** 目次ページの但書。補足色・小さめの文字
- **切替タブ（`.view-tabs`）:** HTML には h1 の直後に1つ置く。`js/tabs.js` が同じタブを前後ナビの前にも複製し、クリックとキーボードで同期する。ボタンには `data-tab`（`overview` / `dark` / `good`）を付け、パネルの id は `panel-{data-tab}` にする
- **定義文（`.definition`）:** 事例の要点を1文で
- **例の一覧（`.examples`）:** Ⓐ Ⓑ などのラベルは `.label` で囲む
- **解説（`.commentary`）:** タブを切り替えても常に表示する
- **前後ナビ（`.case-nav`）:** 前の事例 / 目次 / 次の事例。端のページは `.spacer` で位置を揃える
- **プレースホルダー（`.placeholder`）:** まだ書いていない場所。点線枠で未完成と分かるようにする
- **共通操作モック（`.demo-*`）:** 事例②〜⑮は `case-mocks.css` と `js/demos.js` の共通部品を使う。`.demo-window` の中にブラウザ枠、選択肢、カード、フィードバックなどを組み合わせる
- **専用見た目（`.mock-*`）:** 共通部品の見た目で足りない場合だけ `css/case-NN-mock.css` を追加する。事例①は初期プロトタイプの見た目を残し、動作は `js/demos.js` にまとめている

## Do's and Don'ts

- Do: 色・余白・角丸は `css/tokens.css` の変数で指定する
- Do: 本文の文字色は白背景でコントラスト比 4.5:1 以上にする
- Do: 赤（Dark）と緑（Good）は「ダークパターン」「改善例」の意味でだけ使う
- Do: アニメーションには `prefers-reduced-motion` で止める指定を付ける
- Don't: `box-shadow` や `text-shadow` を使わない（フォーカスの輪郭は `outline` で示す）
- Don't: `tokens.css` 以外に色コード（`#xxxxxx`）を直接書かない
- Don't: Open Props の変数（`--indigo-8` など）をコンポーネントから直接参照しない。必ず `tokens.css` の意味のある名前を通す
- Don't: ダークパターン側のモックで、わざと目立たなくする要素でも 3:1 を下回る色にしない（`--mock-subtle` を使う）
- Don't: Mock accent をサイト本体（サイドバー、タブ、カード）に使わない
