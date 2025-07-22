# Orezenn - 個人用技術ブログプラットフォーム

Zennクローンとして開発する個人用の技術記事投稿・閲覧プラットフォームです。  
microCMSをヘッドレスCMSとして活用し、シンプルで高性能なブログシステムを構築しています。

## ✨ 主要機能（2人用ブログ特化）

### 📝 記事閲覧
- **記事一覧表示** - カード形式での記事一覧（ページネーション対応）✅
- **記事詳細表示** - HTML/Markdownコンテンツのレンダリング ✅
- **高速表示** - TanStack Queryによる自動キャッシュ・最適化 ✅
- **レスポンシブ対応** - PC・タブレット・スマホでの快適な閲覧 ✅

### 🏷️ コンテンツ整理
- **記事検索・フィルタ機能** - タイトル・内容での記事検索 ✅
- **関連記事推薦** - 記事詳細ページでの関連記事表示 ✅
- **読書時間表示** - 記事の推定読書時間 ✅
- **カテゴリ分類** - 技術分野ごとの記事分類（予定）
- **タグシステム** - 細かいトピック分けのタグ付け（予定）

### 📱 ユーザビリティ
- **高速ページ遷移** - SPA方式でのスムーズな操作感 ✅
- **Skeleton UI** - 美しいローディング表示 ✅
- **エラーハンドリング** - 適切なエラー表示・リトライ機能 ✅
- **ダークモード** - 目に優しい夜間モード（予定）
- **SEO最適化** - 検索エンジンフレンドリーな構造（予定）

### ⚡ パフォーマンス
- **自動キャッシュ** - TanStack Queryによる高速データ取得 ✅
- **画像最適化** - microCMSによる自動画像配信最適化 ✅
- **コード分割** - React Routerによる必要な部分のみの読み込み ✅

## 🛠️ 技術スタック

### フロントエンド
- **React 19** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **React Router v7** - クライアントサイドルーティング
- **Tailwind CSS v4** - ユーティリティファーストCSS

### データ管理
- **microCMS** - ヘッドレスCMS（記事管理・配信）
- **TanStack Query** - サーバー状態管理・キャッシュ・同期
- **microCMS SDK** - TypeScript対応のCMSクライアント

### Markdown処理
- **react-markdown** - Markdownレンダリング
- **remark/rehype plugins** - Markdown拡張機能
- **CSS Modules** - HTML コンテンツの詳細スタイリング

### 開発ツール・CI
- **Biome** - 統合Linter & Formatter
- **GitHub Actions** - 自動CI/CD（lint, format, type-check, build）
- **date-fns** - 日付フォーマットライブラリ
- **pnpm** - 高速パッケージマネージャー

## 📁 プロジェクト構成

```
src/
├── components/              # 再利用可能なコンポーネント
│   ├── layout/             # Header, Footer, Layout
│   ├── ui/                 # shadcn/ui ベースのUIコンポーネント
│   ├── articles/           # 記事関連の共通コンポーネント
│   └── markdown/           # Markdown/HTML レンダリング
├── pages/                  # ページコンポーネント
│   ├── article/            # 記事詳細ページ
│   └── articles/           # 記事一覧ページ
├── hooks/                  # カスタムフック
│   └── useArticles.ts      # 記事取得フック
├── types/                  # TypeScript型定義
│   ├── api.ts             # microCMS API型定義
│   └── ui.ts              # UI関連型定義
├── lib/                    # ライブラリ設定
│   ├── microcms.ts        # microCMS SDK設定
│   ├── query.ts           # TanStack Query設定
│   └── utils.ts           # shadcn/ui utilities
├── utils/                  # ユーティリティ関数
│   ├── cn.ts              # className utilities
│   └── date.ts            # 日付フォーマット
└── assets/                 # 静的ファイル
```

## 🚀 開発開始

### 前提条件
- Node.js (v22.17.1)
- pnpm
- microCMSアカウント・プロジェクト

### インストール
```bash
# 依存関係のインストール
pnpm install

# Playwrightブラウザのインストール
npx playwright install
```

### 開発サーバー起動
```bash
# 開発サーバー起動
pnpm dev
```

### テスト実行
```bash
# E2Eテスト実行
pnpm test:e2e

# E2Eテスト（UIモード）
pnpm test:e2e:ui

# E2Eテスト（ヘッド付きブラウザ）
pnpm test:e2e:headed

# E2Eテスト（デバッグモード）
pnpm test:e2e:debug
```

### ビルド・デプロイ
```bash
# 型チェック
pnpm type-check

# リント・フォーマット
pnpm check

# ビルド
pnpm build

# プレビュー
pnpm preview
```

## 🎯 開発ロードマップ

### Phase 1: 基本ブログ機能 ✅
- [x] プロジェクト環境設定
- [x] ルーティング設定
- [x] TanStack Query + microCMS SDK導入
- [x] 共通レイアウト作成（Header, Footer, Layout）
- [x] 記事一覧ページ（microCMS連携）
- [x] 記事詳細ページ（HTML/Markdownレンダリング）
- [x] Skeleton UI・ローディング改善
- [x] 基本的なエラーハンドリング
- [x] GitHub Actions CI設定
- [x] コードベース整理・最適化

### Phase 2: UX・パフォーマンス向上 🚧
- [ ] 無限スクロール（useInfiniteQuery）
- [ ] 記事検索・フィルタリング機能の拡張
- [ ] カテゴリ・タグ機能
- [ ] 記事のプリフェッチ機能
- [ ] パフォーマンス監視

### Phase 3: 高度な機能 🔜
- [ ] ダークモード切り替え
- [ ] PWA対応（オフライン閲覧）
- [ ] SEO最適化（メタタグ・OGP）
- [ ] サイトマップ自動生成
- [ ] Google Analytics連携

### Phase 4: 運用・保守 🔜
- [ ] Error Boundary実装
- [ ] セキュリティ強化
- [ ] デプロイ自動化
- [ ] パフォーマンス最適化

## 🌐 デプロイ

### 推奨環境
- **Vercel** - Reactアプリの高速デプロイ
- **Netlify** - 静的サイト生成・CDN配信
- **Cloudflare Pages** - エッジ配信・高速表示

### 環境変数設定
デプロイ時に以下の環境変数を設定：
```
VITE_MICROCMS_SERVICE_DOMAIN=your-service-domain
VITE_MICROCMS_API_KEY=your-api-key
```

## 🔧 開発ガイドライン

### コード品質
- **Biome** による統一された lint・format ルール
- **GitHub Actions** による自動CI実行
- **TypeScript** による型安全性の確保
- **TanStack Query** によるデータフェッチの統一

### アーキテクチャ
- **ID ベースルーティング** - slug ではなく記事IDでの直接アクセス
- **コンポーネント分離** - ページ固有とグローバル共通の明確な分離
- **CSS Modules** - HTML コンテンツの細かいスタイリング
- **shadcn/ui** - 一貫したUIコンポーネント

## 📄 ライセンス

MIT License

## 🤝 開発者

個人開発プロジェクト

---

**現在のステータス**: ✅ Phase 1 完了 → 🚧 Phase 2 開始  
**最終更新**: 2024年7月  
**CMS**: microCMS  
**主要技術**: React + TypeScript + TanStack Query + microCMS + Biome
