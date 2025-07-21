import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/**
 * microCMSの基本フィールド型
 */
export interface MicroCMSContent extends MicroCMSDate {
  id: string;
}

/**
 * 記事のステータス
 */
export type ArticleStatus = 'draft' | 'published' | 'private' | 'scheduled';

/**
 * 記事の種別
 */
export type ArticleType = 'tech' | 'idea' | 'book' | 'scrap';

/**
 * 作成者情報
 */
export interface Author extends MicroCMSContent {
  name: string;
  username: string; // ユニークなユーザー名
  bio: string;
  avatar: MicroCMSImage;
  email?: string;
  location?: string;
  company?: string;
  position?: string; // 職種
  experience?: number; // 経験年数
  socialLinks?: {
    twitter?: string;
    github?: string;
    website?: string;
    linkedin?: string;
    zenn?: string;
    qiita?: string;
  };
  // 統計情報
  stats?: {
    articlesCount: number;
    followersCount: number;
    followingCount: number;
    likesCount: number;
    totalViews: number;
  };
  // 設定
  isPublic: boolean;
  isEmailPublic: boolean;
  isHireable: boolean;
}

/**
 * カテゴリ情報
 */
export interface Category extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string; // アイコン名（Lucide React等）
  emoji?: string; // 絵文字
  parentCategory?: Category; // 親カテゴリ（階層構造用）
  // 統計情報
  stats?: {
    articlesCount: number;
    popularityScore: number; // 人気度スコア
  };
  // 設定
  isPublished: boolean;
  sortOrder: number;
}

/**
 * タグ情報
 */
export interface Tag extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  // 統計情報
  stats?: {
    articlesCount: number;
    followersCount: number;
    popularityScore: number;
  };
  // 関連タグ
  relatedTags?: Tag[];
}

/**
 * シリーズ情報
 */
export interface Series extends MicroCMSContent {
  title: string;
  slug: string;
  description: string;
  emoji?: string;
  coverImage?: MicroCMSImage;
  author: Author;
  // 統計情報
  stats?: {
    articlesCount: number;
    totalViews: number;
    likesCount: number;
  };
  // 設定
  isPublished: boolean;
  isCompleted: boolean;
}

/**
 * 記事のSEO情報
 */
export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: MicroCMSImage;
  keywords?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * 記事の統計情報
 */
export interface ArticleStats {
  viewCount: number;
  likeCount: number;
  stockCount: number; // ブックマーク数
  commentCount: number;
  shareCount: number;
  readingTime: number; // 分単位
  readingRate?: number; // 読了率（%）
}

/**
 * 記事データ
 */
export interface Article extends MicroCMSContent {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  emoji?: string; // Zennスタイルの絵文字
  type: ArticleType;
  status: ArticleStatus;

  // 関連情報
  author: Author;
  category: Category;
  tags: Tag[];
  series?: Series;

  // 画像
  eyecatch?: MicroCMSImage;

  // 日時
  publishedAt?: string; // 公開日時
  scheduledAt?: string; // 予約投稿日時
  lastEditedAt?: string; // 最終編集日時

  // 設定
  isPublished: boolean;
  isPinned: boolean; // 固定記事
  allowComments: boolean;

  // SEO
  seo?: ArticleSEO;

  // 統計
  stats?: ArticleStats;

  // 技術関連
  techStack?: string[]; // 使用技術
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // 難易度

  // 外部リンク
  externalUrl?: string; // 外部記事URL（はてブ等）
  sourceUrl?: string; // ソースコードURL
  demoUrl?: string; // デモURL
}

/**
 * 記事の下書きデータ（公開前の一時保存用）
 */
export interface ArticleDraft {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  categoryId?: string;
  tagIds?: string[];
  seriesId?: string;
  type: ArticleType;
  autoSavedAt: string;
}

/**
 * microCMSのリストレスポンス型
 */
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * レスポンス型エイリアス
 */
export type ArticlesResponse = MicroCMSListResponse<Article>;
export type CategoriesResponse = MicroCMSListResponse<Category>;
export type TagsResponse = MicroCMSListResponse<Tag>;
export type AuthorsResponse = MicroCMSListResponse<Author>;
export type SeriesResponse = MicroCMSListResponse<Series>;

/**
 * 検索・フィルタ用のクエリパラメータ
 */
export interface ArticleSearchParams {
  // 基本検索
  q?: string; // 検索キーワード

  // フィルタ
  categoryId?: string;
  categorySlug?: string;
  tagId?: string;
  tagSlug?: string;
  authorId?: string;
  authorUsername?: string;
  seriesId?: string;
  seriesSlug?: string;
  type?: ArticleType;
  status?: ArticleStatus;
  difficulty?: Article['difficulty'];

  // 日付範囲
  publishedAfter?: string; // YYYY-MM-DD
  publishedBefore?: string; // YYYY-MM-DD

  // ページネーション
  limit?: number;
  offset?: number;
  page?: number;

  // ソート
  orders?: string; // -publishedAt, -viewCount, -likeCount など

  // 特殊フィルタ
  isPinned?: boolean;
  hasEyecatch?: boolean;
  minReadingTime?: number;
  maxReadingTime?: number;

  // フィールド選択（パフォーマンス最適化用）
  fields?: string[];
  depth?: 1 | 2 | 3; // 関連コンテンツの取得深度

  // microCMS直接フィルタ（内部使用）
  filters?: string[];
}

/**
 * カテゴリ検索パラメータ
 */
export interface CategorySearchParams {
  q?: string;
  parentCategoryId?: string;
  isPublished?: boolean;
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string[];
}

/**
 * タグ検索パラメータ
 */
export interface TagSearchParams {
  q?: string;
  popularityMin?: number;
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string[];
}

/**
 * ページネーション情報
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  offset: number;
}

/**
 * 検索結果
 */
export interface SearchResult<T> {
  items: T[];
  pagination: PaginationInfo;
  facets?: {
    categories?: Array<{ category: Category; count: number }>;
    tags?: Array<{ tag: Tag; count: number }>;
    authors?: Array<{ author: Author; count: number }>;
    types?: Array<{ type: ArticleType; count: number }>;
  };
}

/**
 * 人気記事の集計結果
 */
export interface PopularArticles {
  daily: Article[];
  weekly: Article[];
  monthly: Article[];
  allTime: Article[];
}

/**
 * トレンド情報
 */
export interface TrendingContent {
  articles: Article[];
  tags: Tag[];
  categories: Category[];
  authors: Author[];
}

/**
 * 統計情報サマリー
 */
export interface StatsSummary {
  totalArticles: number;
  totalAuthors: number;
  totalViews: number;
  totalLikes: number;
  averageReadingTime: number;
  topCategories: Array<{ category: Category; count: number }>;
  topTags: Array<{ tag: Tag; count: number }>;
  activeAuthors: Author[];
}

/**
 * サイトマップ用の記事情報
 */
export interface SitemapArticle {
  slug: string;
  publishedAt: string;
  lastEditedAt?: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * RSS/Atom フィード用の記事情報
 */
export interface FeedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    email?: string;
  };
  publishedAt: string;
  category?: {
    name: string;
    slug: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

/**
 * API エラーレスポンス
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * API 成功レスポンス（汎用）
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
}

/**
 * バッチ操作の結果
 */
export interface BatchResult<T> {
  successful: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
  totalProcessed: number;
}
