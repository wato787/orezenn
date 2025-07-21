import {
  fetchTag,
  fetchTags,
} from '@/lib/microcms';
import type {
  ApiError,
  Tag,
  TagSearchParams,
  TagsResponse
} from '@/types/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

// タグ一覧のクエリキー生成
export const createTagsQueryKey = (params?: TagSearchParams) =>
  ['tags', params] as const;

// タグ詳細のクエリキー生成
export const createTagQueryKey = (id: string) =>
  ['tags', 'detail', id] as const;



/**
 * タグ一覧取得フック
 */
export const useTags = (
  params?: TagSearchParams,
  options?: Omit<UseQueryOptions<TagsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createTagsQueryKey(params),
    queryFn: () => fetchTags(params),
    staleTime: 10 * 60 * 1000, // 10分
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

/**
 * タグ詳細取得フック（ID指定）
 */
export const useTag = (
  id: string,
  options?: Omit<UseQueryOptions<Tag, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createTagQueryKey(id),
    queryFn: () => fetchTag(id),
    staleTime: 20 * 60 * 1000, // 20分
    enabled: Boolean(id),
    ...options,
  });
};



/**
 * 人気タグ一覧取得フック
 */
export const usePopularTags = (
  limit: number = 20,
  options?: Omit<UseQueryOptions<TagsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useTags(
    {
      limit,
      orders: '-createdAt', // 作成日順（新しい順）
    },
    options
  );
};

/**
 * タグ検索フック
 */
export const useSearchTags = (
  searchQuery: string,
  additionalParams?: Omit<TagSearchParams, 'q'>,
  options?: Omit<UseQueryOptions<TagsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['tags', 'search', searchQuery, additionalParams],
    queryFn: () => fetchTags({
      q: searchQuery,
      ...additionalParams,
    }),
    enabled: searchQuery.length >= 1, // 1文字以上で検索実行
    staleTime: 5 * 60 * 1000, // 5分
    ...options,
  });
};

/**
 * タグプリフェッチ用ユーティリティ
 */
export const useTagPrefetch = () => {
  const prefetchTags = (params?: TagSearchParams) => ({
    queryKey: createTagsQueryKey(params),
    queryFn: () => fetchTags(params),
    staleTime: 10 * 60 * 1000,
  });

  const prefetchTag = (id: string) => ({
    queryKey: createTagQueryKey(id),
    queryFn: () => fetchTag(id),
    staleTime: 20 * 60 * 1000,
  });



  return {
    prefetchTags,
    prefetchTag,
  };
};

/**
 * タグキャッシュ無効化用ユーティリティ型
 */
export type TagQueryInvalidation = {
  type: 'all' | 'list' | 'detail' | 'search';
  id?: string;
  slug?: string;
  params?: TagSearchParams;
};
