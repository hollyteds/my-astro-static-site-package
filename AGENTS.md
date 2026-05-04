# リポジトリガイドライン（AGENTS）

このファイルは、Astroベースの静的サイト案件で再利用するための作業標準です。

## 1. 目的と適用範囲

- 目的: 実装品質と運用の一貫性を保ちながら、変更を安全に進めること。
- 適用範囲: このリポジトリ配下の全コード（`src/`, 設定ファイル, ビルド設定, テスト設定）。
- 優先順位:
  1. 破壊を避ける（既存挙動を保つ）
  2. 保守性（責務分離・読みやすさ）
  3. パフォーマンス（不要な配信や実行を避ける）
  4. 実装速度

## 2. 標準スタック（現在仕様）

- Framework: Astro v6
- UI: 必要に応じて React（アイランドで使用）
- CSS: Tailwind CSS v4 + DaisyUI v5
- CSS変換: Vite `lightningcss`（PostCSSパイプラインは使わない）
- Lint/Format: ESLint, Prettier, Stylelint（SMACSS順）
- TypeScript: strict

このテンプレートでは、UI実装は **daisyUIを主軸** にします（Tailwindユーティリティの直書きより、daisyUIコンポーネント/トークン活用を優先）。

## 3. 基本コマンド

- 開発: `npm run dev`
- 本番ビルド: `npm run build` または `npm run build:prod`
- テスト向けビルド: `npm run build:test`
- プレビュー: `npm run preview`
- CSSチェック: `npm run lint:css`
- CSS自動修正: `npm run fix:css`
- 整形: `npm run format`

## 4. ビルドモード運用

- `build` / `build:prod` は `--mode production` を使う。
- `build:test` は `--mode test` を使う。
- mode判定は共通定数を利用する。
  - `src/utils/runtimeMode.ts`
  - `isDevMode`
  - `isTestMode`
  - `isProdNonTestMode`

実装時の原則:

- `import.meta.env.MODE === "test"` を都度直書きせず、共通定数をimportして使う。
- 計測タグや外部連携のON/OFFは mode で分離する。

## 5. CSS・Tailwind運用

- Tailwind v4 は `src/styles/global.css` で読み込む。
  - `@import "tailwindcss";`
  - `@config "../../tailwind.config.mjs";`
  - `@plugin "daisyui";`
- Astro設定では Vite plugin を使用する。
  - `@tailwindcss/vite`
  - `vite.css.transformer = "lightningcss"`
- PostCSS設定ファイル（`postcss.config.*`）は作成しない。
- UIは daisyUI を優先して構築する。
  - まず daisyUI のコンポーネントクラス（例: `btn`, `card`, `alert`, `badge`）を検討する。
  - 不足分のみ Tailwind ユーティリティやカスタムCSSで補う。
  - カラー/余白/角丸は daisyUI のテーマトークン利用を優先する。
- レスポンシブ実装は、コンポーネント単位で **コンテナクエリを優先** して検討する。
  - コンテナクエリで要件を満たしにくい場合のみ、メディアクエリを許容する。

## 6. CSSプロパティ順（SMACSS）

- `css-declaration-sorter` の代替として Stylelint autofix を使う。
- ルール定義は `stylelint.config.cjs` を使う。
  - `stylelint-config-property-sort-order-smacss`
  - `stylelint-order`
  - `.astro` の `<style>` 解析に `postcss-html`

運用ルール:

- CSSを編集したら `npm run lint:css` を実行。
- 差分調整が必要なら `npm run fix:css` を実行。

## 7. Material Icons 最適化

Material Icons / Material Symbols は「使う分だけ」読み込む。

- `src/utils/materialIconStylesheets.ts` で使用アイコン名を走査してURLを生成。
- `src/layouts/Layout.astro` で `materialIconStylesheets` をheadに出力。
- URLが空の場合はlinkを出さない（不要な外部CSSを避ける）。

注意:

- アイコン名は静的解析されるため、動的生成する場合は取りこぼしに注意する。

## 8. 実装ルール（エージェント行動規範）

- 変更は最小差分で行う（無関係な整形・置換は禁止）。
- 既存意図が不明な実装は、推測で大規模変更しない。
- 依存追加は最小限。追加時は理由を残す。
- 既存のビルド/lintエラーを新規変更で増やさない。
- 仕様変更時は `README.md` を同時更新する。
- 変更内容は `CHANGE_LOG` に随時追記する。
- 構成・配信・運用フローの変更がある場合は `docs/web-architecture.md` を随時更新する。

## 9. 変更後の確認手順

最低限、以下を通すこと。

1. `npm run lint:css`（CSSを触った場合）
2. `npm run build`（production）
3. 必要に応じて `npm run build:test`（mode分岐を触った場合）

## 10. レビュー観点

- 既存挙動との互換性
- mode分岐（production/test/dev）の期待どおりの動作
- CSSロード量（不要な外部読み込みの有無）
- daisyUI優先方針に沿っているか（生Tailwind直書きの過多を避けているか）
- 型安全性（`any`回避、null考慮）
- 命名と責務（再利用しやすい単位に分離できているか）

## 11. 新規案件へ流用するときのチェックリスト

- `site` URL, OGP, meta を案件値に置換
- 計測タグ/外部連携の mode 条件を確認
- `tailwind.config.mjs` のデザイントークンを案件向けに調整
- `materialIconStylesheets` が拾うアイコンクラス名を案件実装と整合
- `README.md` のコマンド・運用手順を案件内容に更新
