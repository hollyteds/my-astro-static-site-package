# My Astro Static Site Package

このプロジェクトは Astro v7 ベースの静的サイトテンプレートです。

## 前提

- Node.js 22.12+
- npm

## セットアップ

```bash
npm install
```

## 開発・ビルドコマンド

```bash
# 開発
npm run dev

# 本番ビルド（default）
npm run build
# 同義
npm run build:prod

# テスト向けビルド（mode=test）
npm run build:test

# ビルド結果のプレビュー
npm run preview

# Astro CLI
npm run astro
```

## ビルドモード運用

このプロジェクトは `--mode` を使って本番とテストを分離しています。

- `build` / `build:prod` -> `astro build --mode production`
- `build:test` -> `astro build --mode test`

`import.meta.env.MODE` と `import.meta.env.DEV` を使う場合は、共通定数を利用してください。

- `src/utils/runtimeMode.ts`
  - `isDevMode`
  - `isTestMode`
  - `isProdNonTestMode` (`!import.meta.env.DEV && import.meta.env.MODE !== "test"`)

## CSS / Tailwind 構成

- Tailwind CSS v4 (`tailwindcss`)
- `@tailwindcss/vite` を Astro 側で利用
- daisyUI (`@plugin "daisyui"`)
- PostCSS パイプラインは使っていません

関連ファイル:

- `astro.config.mjs`
  - `vite.plugins: [tailwindcss()]`
  - `vite.css.transformer: "lightningcss"`（Autoprefixer代替）
- `src/styles/global.css`
  - `@import "tailwindcss"`
  - `@config "../../tailwind.config.mjs"`
  - `@plugin "daisyui"`
- `tailwind.config.mjs`

## CSSプロパティ順（SMACSS）

`css-declaration-sorter` の代替として Stylelint の autofix を使います。

```bash
# チェック
npm run lint:css

# 自動修正
npm run fix:css
```

関連ファイル:

- `stylelint.config.cjs`
  - `stylelint-config-property-sort-order-smacss`
  - `stylelint-order`
  - `postcss-html`（`.astro` 内 `<style>` の解析）

## Material Icons 最適化読み込み

`Layout.astro` では、Google Fonts の Material Icons / Symbols を固定URLで丸ごと読み込まず、使用アイコン名を走査して最小URLを生成します。

- `src/utils/materialIconStylesheets.ts`
  - `src` 配下の `.astro/.css/.js/.jsx/.ts/.tsx` を `?raw` で走査
  - `material-icons` / `material-symbols-outlined` の利用名を抽出
  - `icon_names=` 付きの Google Fonts URL を生成
- `src/layouts/Layout.astro`
  - `materialIconStylesheets` が空でない時だけ `<link rel="stylesheet">` を出力
  - `fonts.googleapis.com` / `fonts.gstatic.com` へ `preconnect`

## エイリアス

主なパスエイリアスは `tsconfig.json` で定義しています。

- `@components/*`
- `@layouts/*`
- `@modules/*`
- `@images/*`
- `@links`
- `@classList`

## 環境変数

`.env` は存在し、現在は例として `FALLBACK_FORMAT=webp` が定義されています。

mode 別に分ける場合は以下を追加してください。

- `.env.production`
- `.env.test`

## 留意点

- daisyUI 利用時、CSS最適化で `@property` に関する警告が出ることがありますが、ビルド自体は完了します。
- `npm run build:test` と `npm run build:prod` を同時実行すると、同じ `dist/` を書き換えて競合することがあります。1コマンドずつ実行してください。
