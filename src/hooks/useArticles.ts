import {
    fetchArticle,
    fetchArticles,
    fetchRelatedArticles
} from '@/lib/microcms';
import type {
    ApiError,
    Article,
    ArticleSearchParams,
    ArticlesResponse
} from '@/types/api';
import { useInfiniteQuery, useQuery, type UseInfiniteQueryOptions, type UseQueryOptions } from '@tanstack/react-query';

// 記事一覧取得のクエリキー生成
export const createArticlesQueryKey = (params?: ArticleSearchParams) =>
  ['articles', params] as const;

// 記事詳細のクエリキー生成
export const createArticleQueryKey = (id: string) =>
  ['articles', 'detail', id] as const;

// 関連記事のクエリキー生成
export const createRelatedArticlesQueryKey = (articleId: string, limit?: number) =>
  ['articles', 'related', articleId, limit] as const;

/**
 * 記事一覧取得フック
 */
export const useArticles = (
  params?: ArticleSearchParams,
  options?: Omit<UseQueryOptions<ArticlesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createArticlesQueryKey(params),
    queryFn: () => fetchArticles(params),
    staleTime: 5 * 60 * 1000, // 5分
    placeholderData: (previousData) => previousData, // 前のデータを表示
    ...options,
  });
};

/**
 * 記事詳細取得フック（ID指定）
 */
export const useArticle = (
  id: string,
  options?: Omit<UseQueryOptions<Article, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createArticleQueryKey(id),
    queryFn: () => fetchArticle(id),
    staleTime: 10 * 60 * 1000, // 10分
    enabled: Boolean(id), // IDが存在する場合のみクエリ実行
    ...options,
  });
};

/**
 * 関連記事取得フック
 */
export const useRelatedArticles = (
  articleId: string,
  limit: number = 5,
  options?: Omit<UseQueryOptions<Article[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createRelatedArticlesQueryKey(articleId, limit),
    queryFn: () => fetchRelatedArticles(articleId, limit),
    staleTime: 15 * 60 * 1000, // 15分
    enabled: Boolean(articleId), // 記事IDが存在する場合のみクエリ実行
    ...options,
  });
};

/**
 * 記事一覧無限スクロール用フック
 */
export const useInfiniteArticles = (
  baseParams?: Omit<ArticleSearchParams, 'limit' | 'offset'>,
  pageSize: number = 10,
  options?: Omit<UseInfiniteQueryOptions<ArticlesResponse, ApiError>, 'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'>
) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', baseParams, pageSize],
        queryFn: ({ pageParam = 0 }) =>
      fetchArticles({
        ...baseParams,
        offset: typeof pageParam === 'number' ? pageParam : 0,
        limit: pageSize,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * pageSize;
      // まだ取得していない記事がある場合は次のページパラメータを返す
      return totalFetched < lastPage.totalCount ? totalFetched : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5分
    ...options,
  });
};

/**
 * 記事検索フック（検索文字列が変更されたときにデバウンス）
 */
export const useSearchArticles = (
  searchQuery: string,
  additionalParams?: Omit<ArticleSearchParams, 'q'>,
  options?: Omit<UseQueryOptions<ArticlesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['articles', 'search', searchQuery, additionalParams],
    queryFn: () => fetchArticles({
      q: searchQuery,
      ...additionalParams,
    }),
    enabled: searchQuery.length >= 2, // 2文字以上で検索実行
    staleTime: 5 * 60 * 1000, // 5分
    // デバウンス効果のためにstaleTimeを利用
    ...options,
  });
};

/**
 * 記事プリフェッチ用ユーティリティ
 */
export const useArticlePrefetch = () => {
  // QueryClientを後で使用する場合のためのヘルパー関数群
  const prefetchArticles = (params?: ArticleSearchParams) => ({
    queryKey: createArticlesQueryKey(params),
    queryFn: () => fetchArticles(params),
    staleTime: 5 * 60 * 1000,
  });

  const prefetchArticle = (id: string) => ({
    queryKey: createArticleQueryKey(id),
    queryFn: () => fetchArticle(id),
    staleTime: 10 * 60 * 1000,
  });

  return {
    prefetchArticles,
    prefetchArticle,
  };
};

export type ArticleQueryInvalidation = {
  type: 'all' | 'list' | 'detail' | 'search' | 'related';
  id?: string;
  slug?: string;
  params?: ArticleSearchParams;
};
