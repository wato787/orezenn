// 記事関連フック
export {
  createArticleBySlugQueryKey, createArticleQueryKey, createArticlesQueryKey, createLatestArticlesQueryKey, createRelatedArticlesQueryKey, useArticle,
  useArticleBySlug, useArticlePrefetch, useArticles, useInfiniteArticles, useLatestArticles, useRelatedArticles, useSearchArticles, type ArticleQueryInvalidation
} from './useArticles';

// カテゴリ関連フック
export {
  createCategoriesQueryKey, createCategoryBySlugQueryKey, createCategoryQueryKey, useCategories,
  useCategory,
  useCategoryBySlug, useCategoryPrefetch, usePublishedCategories, type CategoryQueryInvalidation
} from './useCategories';

// タグ関連フック
export {
  createTagBySlugQueryKey, createTagQueryKey, createTagsQueryKey, usePopularTags,
  useSearchTags, useTag,
  useTagBySlug, useTagPrefetch, useTags, type TagQueryInvalidation
} from './useTags';

// 作成者関連フック
export {
  createAuthorByUsernameQueryKey, createAuthorQueryKey, createAuthorsQueryKey, useAuthor,
  useAuthorByUsername, useAuthorPrefetch, useAuthors, usePublishedAuthors,
  useSearchAuthors, type AuthorQueryInvalidation
} from './useAuthors';

// シリーズ関連フック
export {
  createSeriesBySlugQueryKey, createSeriesDetailQueryKey, createSeriesQueryKey, useCompletedSeries, usePublishedSeries, useSearchSeries, useSeries, useSeriesByAuthor, useSeriesById,
  useSeriesBySlug, useSeriesPrefetch, type SeriesQueryInvalidation
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
