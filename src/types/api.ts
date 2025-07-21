import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/**
 * microCMSの基本フィールド型
 */
export interface MicroCMSContent extends MicroCMSDate {
  id: string;
}

/**
 * 作成者情報
 */
export interface Author extends MicroCMSContent {
  name: string;
  bio: string;
  avatar: MicroCMSImage;
  email?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

/**
 * カテゴリ情報
 */
export interface Category extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

/**
 * タグ情報
 */
export interface Tag extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
}

/**
 * 記事データ
 */
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
  readingTime?: number; // 分単位
  viewCount?: number;
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
 * 記事一覧のレスポンス型
 */
export type ArticlesResponse = MicroCMSListResponse<Article>;

/**
 * カテゴリ一覧のレスポンス型
 */
export type CategoriesResponse = MicroCMSListResponse<Category>;

/**
 * タグ一覧のレスポンス型
 */
export type TagsResponse = MicroCMSListResponse<Tag>;

/**
 * 作成者一覧のレスポンス型
 */
export type AuthorsResponse = MicroCMSListResponse<Author>;

/**
 * 検索・フィルタ用のクエリパラメータ
 */
export interface ArticleSearchParams {
  q?: string; // 検索キーワード
  categoryId?: string;
  tagId?: string;
  authorId?: string;
  publishedAt?: string; // YYYY-MM-DD 形式
  limit?: number;
  offset?: number;
  orders?: string; // -publishedAt など
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
