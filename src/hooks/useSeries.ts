import {
  fetchSeries,
  fetchSeriesById,
} from '@/lib/microcms';
import type {
  ApiError,
  Series,
  SeriesResponse
} from '@/types/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { MicroCMSQueries } from 'microcms-js-sdk';

// シリーズ一覧のクエリキー生成
export const createSeriesQueryKey = (params?: MicroCMSQueries) =>
  ['series', params] as const;

// シリーズ詳細のクエリキー生成
export const createSeriesDetailQueryKey = (id: string) =>
  ['series', 'detail', id] as const;



/**
 * シリーズ一覧取得フック
 */
export const useSeries = (
  params?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<SeriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createSeriesQueryKey(params),
    queryFn: () => fetchSeries(params),
    staleTime: 15 * 60 * 1000, // 15分
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

/**
 * シリーズ詳細取得フック（ID指定）
 */
export const useSeriesById = (
  id: string,
  options?: Omit<UseQueryOptions<Series, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createSeriesDetailQueryKey(id),
    queryFn: () => fetchSeriesById(id),
    staleTime: 30 * 60 * 1000, // 30分
    enabled: Boolean(id),
    ...options,
  });
};



/**
 * 公開済みシリーズ一覧取得フック
 */
export const usePublishedSeries = (
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<SeriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useSeries(
    {
      filters: 'isPublished[equals]true',
      orders: '-createdAt', // 作成日新しい順
      ...additionalParams,
    },
    options
  );
};

/**
 * 完了済みシリーズ一覧取得フック
 */
export const useCompletedSeries = (
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<SeriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useSeries(
    {
      filters: 'isCompleted[equals]true[and]isPublished[equals]true',
      orders: '-updatedAt', // 更新日新しい順
      ...additionalParams,
    },
    options
  );
};

/**
 * 作成者別シリーズ一覧取得フック
 */
export const useSeriesByAuthor = (
  authorId: string,
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<SeriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['series', 'author', authorId, additionalParams],
    queryFn: () => fetchSeries({
      filters: `author[equals]${authorId}`,
      orders: '-createdAt',
      ...additionalParams,
    }),
    enabled: Boolean(authorId),
    staleTime: 15 * 60 * 1000, // 15分
    ...options,
  });
};

/**
 * シリーズ検索フック
 */
export const useSearchSeries = (
  searchQuery: string,
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<SeriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['series', 'search', searchQuery, additionalParams],
    queryFn: () => fetchSeries({
      q: searchQuery,
      ...additionalParams,
    }),
    enabled: searchQuery.length >= 2, // 2文字以上で検索実行
    staleTime: 10 * 60 * 1000, // 10分
    ...options,
  });
};

/**
 * シリーズプリフェッチ用ユーティリティ
 */
export const useSeriesPrefetch = () => {
  const prefetchSeries = (params?: MicroCMSQueries) => ({
    queryKey: createSeriesQueryKey(params),
    queryFn: () => fetchSeries(params),
    staleTime: 15 * 60 * 1000,
  });

  const prefetchSeriesById = (id: string) => ({
    queryKey: createSeriesDetailQueryKey(id),
    queryFn: () => fetchSeriesById(id),
    staleTime: 30 * 60 * 1000,
  });



  return {
    prefetchSeries,
    prefetchSeriesById,
  };
};

/**
 * シリーズキャッシュ無効化用ユーティリティ型
 */
export type SeriesQueryInvalidation = {
  type: 'all' | 'list' | 'detail' | 'search' | 'author';
  id?: string;
  slug?: string;
  authorId?: string;
  params?: MicroCMSQueries;
};
