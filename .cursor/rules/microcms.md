# microCMS 連携ルール

## 🔗 基本接続設定

### クライアント設定
- **場所**: `src/lib/microcms.ts`
- **必須**: 環境変数のバリデーション
- **エラーハンドリング**: 適切なエラーメッセージ

```typescript
// ✅ 設定済み構成
import { createClient } from 'microcms-js-sdk';

export const microCMSClient = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
});
```

### 環境変数
- **VITE_MICROCMS_SERVICE_DOMAIN**: サービスドメイン名
- **VITE_MICROCMS_API_KEY**: APIキー（読み取り専用推奨）
- **型定義**: `src/vite-env.d.ts`に追加済み

## 📋 API設計・スキーマ

### 推奨APIスキーマ

#### Articles API
```json
{
  "title": "テキスト（記事タイトル）",
  "content": "リッチエディタ（Markdown記事本文）",
  "slug": "テキスト（URL用スラッグ）",
  "publishedAt": "日時（公開日時）",
  "author": "コンテンツ参照（Authors API）",
  "category": "コンテンツ参照（Categories API）",
  "tags": "複数コンテンツ参照（Tags API）",
  "eyecatch": "画像（アイキャッチ画像）",
  "excerpt": "テキストエリア（記事概要）",
  "isPublished": "真偽値（公開状態）",
  "readingTime": "数値（推定読書時間・分）"
}
```

#### Authors API
```json
{
  "name": "テキスト（作成者名）",
  "bio": "テキストエリア（自己紹介）",
  "avatar": "画像（プロフィール画像）",
  "email": "テキスト（メールアドレス）",
  "socialLinks": "オブジェクト（SNSリンク等）"
}
```

#### Categories API
```json
{
  "name": "テキスト（カテゴリ名）",
  "slug": "テキスト（URL用スラッグ）",
  "description": "テキストエリア（説明）",
  "color": "テキスト（表示色）"
}
```

#### Tags API
```json
{
  "name": "テキスト（タグ名）",
  "slug": "テキスト（URL用スラッグ）",
  "description": "テキストエリア（説明）"
}
```

## 🔧 API呼び出しルール

### ヘルパー関数使用
- **必須**: `src/lib/microcms.ts`のヘルパー関数を使用
- **禁止**: 直接`microCMSClient.get()`を呼び出さない
- **型安全性**: 戻り値の型を明示

```typescript
// ✅ Good - ヘルパー関数使用
const articles = await fetchArticles({ limit: 10 });
const article = await fetchArticle('article-id');
const categories = await fetchCategories();

// ❌ Bad - 直接クライアント使用
const response = await microCMSClient.get({ endpoint: 'articles' });
```

### クエリパラメータ
- **ページネーション**: `limit`, `offset`
- **フィルタ**: `filters`パラメータ
- **ソート**: `orders`パラメータ
- **フィールド選択**: `fields`パラメータ

```typescript
// ✅ 効率的なAPI呼び出し
const articles = await fetchArticles({
  limit: 10,
  offset: 0,
  orders: '-publishedAt', // 公開日降順
  fields: 'title,excerpt,publishedAt,author.name,category.name', // 必要なフィールドのみ
  filters: 'isPublished[equals]true', // 公開記事のみ
});
```

## 🎯 型定義・型安全性

### 型定義の配置
- **場所**: `src/types/api.ts`
- **継承**: `MicroCMSContent`を基底型として使用
- **拡張**: `MicroCMSDate`フィールドを含む

```typescript
// ✅ 適切な型定義
export interface Article extends MicroCMSContent {
  title: string;
  content: string;
  slug: string;
  publishedAt: string;
  author: Author;
  category: Category;
  tags: Tag[];
  eyecatch?: MicroCMSImage;
  excerpt: string;
  isPublished: boolean;
}
```

### レスポンス型
- **単体**: `Article`, `Author`, `Category`
- **リスト**: `ArticlesResponse`, `CategoriesResponse`
- **ページネーション**: `MicroCMSListResponse<T>`

## 🚨 エラーハンドリング

### API エラー分類
1. **認証エラー** (401): APIキーの確認
2. **権限エラー** (403): API権限の確認
3. **リソース不足** (404): コンテンツIDの確認
4. **レート制限** (429): リクエスト頻度の調整
5. **サーバーエラー** (500): microCMS側の問題

```typescript
// ✅ エラーハンドリング例
export const fetchFromMicroCMS = async <T>(
  endpoint: string,
  queries?: MicroCMSQueries
): Promise<T> => {
  try {
    const response = await microCMSClient.get<T>({
      endpoint,
      queries,
    });
    return response;
  } catch (error) {
    console.error(`microCMS API Error (${endpoint}):`, error);
    
    // エラーの種類に応じて適切なメッセージ
    if (error.status === 404) {
      throw new Error('コンテンツが見つかりません');
    } else if (error.status === 401) {
      throw new Error('APIキーが無効です');
    } else {
      throw new Error(`データの取得に失敗しました: ${endpoint}`);
    }
  }
};
```

## 📊 パフォーマンス最適化

### キャッシュ戦略
- **TanStack Query**: 5分間のstaleTime
- **CDN**: microCMSの画像CDN活用
- **フィールド選択**: 必要最小限のデータ取得

### 画像最適化
- **WebP対応**: microCMSの自動WebP変換
- **レスポンシブ画像**: サイズ指定クエリ活用

```typescript
// ✅ 画像最適化例
const getOptimizedImageUrl = (image: MicroCMSImage, width: number) => {
  return `${image.url}?w=${width}&auto=webp`;
};

// 使用例
<img 
  src={getOptimizedImageUrl(article.eyecatch, 400)}
  srcSet={`
    ${getOptimizedImageUrl(article.eyecatch, 400)} 400w,
    ${getOptimizedImageUrl(article.eyecatch, 800)} 800w
  `}
  alt={article.title}
/>
```

## 🔍 検索・フィルタリング

### 全文検索
- **パラメータ**: `q`クエリパラメータ
- **対象**: タイトル・本文・概要

```typescript
// 検索実装例
const searchArticles = async (keyword: string) => {
  return fetchArticles({
    q: keyword,
    limit: 20,
    orders: '-publishedAt',
  });
};
```

### フィルタリング
- **カテゴリ**: `filters=category[equals]category-id`
- **タグ**: `filters=tags[contains]tag-id`
- **公開状態**: `filters=isPublished[equals]true`

```typescript
// フィルタリング例
const getArticlesByCategory = async (categoryId: string) => {
  return fetchArticles({
    filters: `category[equals]${categoryId}[and]isPublished[equals]true`,
    orders: '-publishedAt',
  });
};
```

## 🔄 開発・本番環境

### 環境別設定
- **開発**: プレビューAPI使用可能
- **本番**: 公開コンテンツのみ

### プレビュー機能
- **draftKey**: 下書き記事のプレビュー
- **実装**: 今後検討（管理機能として）

---

**最終更新**: 2024年7月 
