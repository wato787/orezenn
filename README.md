# Orezenn - 個人用技術ブログプラットフォーム

Zennクローンとして開発する個人用の技術記事投稿・閲覧プラットフォームです。  
microCMSをヘッドレスCMSとして活用し、シンプルで高性能なブログシステムを構築しています。

## ✨ 主要機能

### 📝 記事閲覧
- **記事一覧表示** - カード形式での記事一覧（無限スクロール対応）
- **記事詳細表示** - Markdownコンテンツのレンダリング
- **高速表示** - TanStack Queryによる自動キャッシュ・最適化
- **レスポンシブ対応** - PC・タブレット・スマホでの快適な閲覧

### 🏷️ コンテンツ整理
- **カテゴリ分類** - 技術分野ごとの記事分類
- **タグシステム** - 細かいトピック分けのタグ付け
- **検索・フィルタ機能** - タイトル・内容・タグでの記事検索
- **読書時間表示** - 記事の推定読書時間

### 📱 ユーザビリティ
- **高速ページ遷移** - SPA方式でのスムーズな操作感
- **ダークモード** - 目に優しい夜間モード（予定）
- **PWA対応** - モバイルアプリライクな体験（予定）
- **SEO最適化** - 検索エンジンフレンドリーな構造

### ⚡ パフォーマンス
- **自動キャッシュ** - 一度読み込んだ記事の高速表示
- **バックグラウンド更新** - 最新記事の自動取得
- **画像最適化** - microCMSによる自動画像配信最適化
- **コード分割** - 必要な部分のみの読み込み

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
- **Prism.js** - シンタックスハイライト（予定）

### 開発ツール
- **Biome** - Linter & Formatter
- **ESLint** - コード品質チェック
- **EditorConfig** - エディタ設定統一

## 📁 プロジェクト構成

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── layout/         # Header, Footer, Layout
│   ├── ui/             # Button, Card等の基本UI
│   └── features/       # 記事表示等の機能別コンポーネント
├── hooks/              # カスタムフック
│   ├── api/           # microCMS API関連フック
│   └── ui/            # UI状態管理フック
├── types/              # TypeScript型定義
│   ├── api.ts         # microCMS API型定義
│   └── article.ts     # 記事データ型定義
├── lib/                # ライブラリ設定
│   ├── microcms.ts    # microCMS SDK設定
│   └── query.ts       # TanStack Query設定
├── utils/              # ユーティリティ関数
├── pages/              # ページコンポーネント
└── assets/             # 静的ファイル
```

## 🚀 開発開始

### 前提条件
- Node.js (v22.17.1)
- pnpm
- microCMSアカウント・プロジェクト

### microCMS設定
1. microCMSでプロジェクト作成
2. 「記事」APIの作成（以下のフィールド推奨）
   ```
   - title: テキスト（記事タイトル）
   - content: リッチエディタ（Markdown記事本文）
   - slug: テキスト（URL用スラッグ）
   - publishedAt: 日時（公開日時）
   - category: コンテンツ参照（カテゴリ）
   - tags: 複数コンテンツ参照（タグ）
   - eyecatch: 画像（アイキャッチ画像）
   - excerpt: テキストエリア（記事概要）
   ```
3. APIキーの取得（環境変数用）

### ローカル開発環境セットアップ
```bash
# 依存関係インストール
pnpm install

# 環境変数ファイル作成
cp .env.example .env.local

# .env.localに以下を設定
VITE_MICROCMS_SERVICE_DOMAIN=your-service-domain
VITE_MICROCMS_API_KEY=your-api-key

# 開発サーバー起動
pnpm dev
```

### 開発状況の確認
アプリケーションにアクセスすると、以下の動作確認ができます：
- TanStack Query の動作テスト（Issue #1）
- microCMS SDK の接続テスト（Issue #2）
- 各技術スタックの導入状況確認

### 利用可能なスクリプト
- `pnpm dev` - 開発サーバー起動 (http://localhost:5173)
- `pnpm build` - プロダクションビルド
- `pnpm preview` - ビルド結果のプレビュー
- `pnpm format` - Biomeフォーマット実行
- `pnpm check` - Biome全体チェック
- `pnpm check:fix` - 自動修正付きチェック

## 🎯 開発ロードマップ

### Phase 1: 基本ブログ機能 🏗️
- [x] プロジェクト環境設定
- [x] ルーティング設定
- [x] TanStack Query + microCMS SDK導入
- [ ] 共通レイアウト作成
- [ ] 記事一覧ページ（microCMS連携）
- [ ] 記事詳細ページ（Markdownレンダリング）
- [ ] 基本的なローディング・エラー処理

### Phase 2: UX・パフォーマンス向上 ⚡
- [ ] 無限スクロール（useInfiniteQuery）
- [ ] Skeleton UI・ローディング改善
- [ ] 記事検索・フィルタリング
- [ ] カテゴリ・タグ機能
- [ ] 記事のプリフェッチ機能

### Phase 3: 高度な機能 ✨
- [ ] ダークモード切り替え
- [ ] PWA対応（オフライン閲覧）
- [ ] SEO最適化（メタタグ・OGP）
- [ ] サイトマップ自動生成
- [ ] Google Analytics連携

### Phase 4: 運用・保守 🔧
- [ ] Error Boundary実装
- [ ] パフォーマンス監視
- [ ] キャッシュ戦略最適化
- [ ] セキュリティ対応
- [ ] デプロイ自動化

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

## 📄 ライセンス

MIT License

## 🤝 開発者

個人開発プロジェクト

---

**現在のステータス**: 🏗️ 開発中 (Phase 1)  
**最終更新**: 2024年7月  
**CMS**: microCMS  
**主要技術**: React + TypeScript + TanStack Query + microCMS
