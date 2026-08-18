## 2026-08-18

- chore: 依存パッケージを Astro v7 系へ更新し、`npm audit fix` で脆弱性を解消
  - `astro` を `^7.2.0` へ更新
  - `@astrojs/check`, `@astrojs/sitemap`, `@playwright/test`, `@tailwindcss/vite`, `tailwindcss`, `daisyui`, `eslint`, `stylelint`, `prettier` など主要開発依存を更新
  - `package-lock.json` を再生成し、`npm audit` の残件を 0 件化
- refactor: 未使用または Astro 7 非互換の依存を除去
  - `@astrojs/react`, `react-dom`, `astro-compress`, `astro-relative-links`, `astro-icon`, `astro-simple-art-direction` を削除
  - `astro-simple-art-direction` に依存していた `Headline.astro` を単純なマークアップへ置換
- docs: `README.md` の前提を Astro v7 / Node.js 22.12+ に更新

## 2026-05-04

- docs: `docs/web-architecture.md` を新規作成（`suginami-premium` の `docs/web-architecture.md` を参照したベース版）
  - 静的配信/ API併用の構成図（Mermaid）
  - mode 分離（production/test）と `runtimeMode` 利用方針
  - Tailwind v4 + daisyUI + lightningcss 前提の実装方針
  - Material Icons 最適化読み込み方針
  - 運用・セキュリティ・責務分離・流用チェックリスト
- docs: `AGENTS.md` を新規作成し、現行仕様ベースの作業標準を追加
  - daisyUI 主軸のUI実装方針を明記
  - レスポンシブはコンテナクエリ優先、難しい場合のみメディアクエリ許容
