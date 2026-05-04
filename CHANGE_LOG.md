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
