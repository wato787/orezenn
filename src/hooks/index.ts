// 記事関連フック
export {
  createArticleQueryKey, createArticlesQueryKey, createLatestArticlesQueryKey, createRelatedArticlesQueryKey, useArticle,
  useArticlePrefetch, useArticles, useInfiniteArticles, useLatestArticles, useRelatedArticles, useSearchArticles, type ArticleQueryInvalidation
} from './useArticles';

// カテゴリ関連フック
export {
  createCategoriesQueryKey, createCategoryQueryKey, useCategories,
  useCategory,
  useCategoryPrefetch, usePublishedCategories, type CategoryQueryInvalidation
} from './useCategories';

// タグ関連フック
export {
  createTagQueryKey, createTagsQueryKey, usePopularTags,
  useSearchTags, useTag,
  useTagPrefetch, useTags, type TagQueryInvalidation
} from './useTags';

// 作成者関連フック
export {
  createAuthorQueryKey, createAuthorsQueryKey, useAuthor,
  useAuthorPrefetch, useAuthors, usePublishedAuthors,
  useSearchAuthors, type AuthorQueryInvalidation
} from './useAuthors';

// シリーズ関連フック
export {
  createSeriesDetailQueryKey, createSeriesQueryKey, useCompletedSeries, usePublishedSeries, useSearchSeries, useSeries, useSeriesByAuthor, useSeriesById,
  useSeriesPrefetch, type SeriesQueryInvalidation
} from './useSeries';

// 型の再エクスポート
import type { ArticleQueryInvalidation } from './useArticles';
import type { AuthorQueryInvalidation } from './useAuthors';
import type { CategoryQueryInvalidation } from './useCategories';
import type { SeriesQueryInvalidation } from './useSeries';
import type { TagQueryInvalidation } from './useTags';

/**
 * 全クエリ無効化用のユーティリティ型
 */
export type QueryInvalidation =
  | ArticleQueryInvalidation
  | CategoryQueryInvalidation
  | TagQueryInvalidation
  | AuthorQueryInvalidation
  | SeriesQueryInvalidation;
