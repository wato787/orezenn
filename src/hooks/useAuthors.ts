import {
  fetchAuthor,
  fetchAuthorByUsername,
  fetchAuthors
} from '@/lib/microcms';
import type {
  ApiError,
  Author,
  AuthorsResponse
} from '@/types/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { MicroCMSQueries } from 'microcms-js-sdk';

// 作成者一覧のクエリキー生成
export const createAuthorsQueryKey = (params?: MicroCMSQueries) =>
  ['authors', params] as const;

// 作成者詳細のクエリキー生成
export const createAuthorQueryKey = (id: string) =>
  ['authors', 'detail', id] as const;

// ユーザー名ベース作成者詳細のクエリキー生成
export const createAuthorByUsernameQueryKey = (username: string) =>
  ['authors', 'username', username] as const;

/**
 * 作成者一覧取得フック
 */
export const useAuthors = (
  params?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<AuthorsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createAuthorsQueryKey(params),
    queryFn: () => fetchAuthors(params),
    staleTime: 20 * 60 * 1000, // 20分（作成者情報は変更頻度が低い）
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

/**
 * 作成者詳細取得フック（ID指定）
 */
export const useAuthor = (
  id: string,
  options?: Omit<UseQueryOptions<Author, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createAuthorQueryKey(id),
    queryFn: () => fetchAuthor(id),
    staleTime: 30 * 60 * 1000, // 30分
    enabled: Boolean(id),
    ...options,
  });
};

/**
 * 作成者詳細取得フック（ユーザー名指定）
 */
export const useAuthorByUsername = (
  username: string,
  options?: Omit<UseQueryOptions<Author, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createAuthorByUsernameQueryKey(username),
    queryFn: () => fetchAuthorByUsername(username),
    staleTime: 30 * 60 * 1000, // 30分
    enabled: Boolean(username),
    retry: (failureCount, error) => {
      // 404エラーの場合はリトライしない
      if ((error as ApiError)?.status === 404) return false;
      return failureCount < 2;
    },
    ...options,
  });
};

/**
 * 公開済み作成者一覧取得フック
 */
export const usePublishedAuthors = (
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<AuthorsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useAuthors(
    {
      filters: 'isPublic[equals]true',
      orders: 'name', // 名前順で並び替え
      ...additionalParams,
    },
    options
  );
};

/**
 * 作成者検索フック
 */
export const useSearchAuthors = (
  searchQuery: string,
  additionalParams?: MicroCMSQueries,
  options?: Omit<UseQueryOptions<AuthorsResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['authors', 'search', searchQuery, additionalParams],
    queryFn: () => fetchAuthors({
      q: searchQuery,
      ...additionalParams,
    }),
    enabled: searchQuery.length >= 2, // 2文字以上で検索実行
    staleTime: 10 * 60 * 1000, // 10分
    ...options,
  });
};

/**
 * 作成者プリフェッチ用ユーティリティ
 */
export const useAuthorPrefetch = () => {
  const prefetchAuthors = (params?: MicroCMSQueries) => ({
    queryKey: createAuthorsQueryKey(params),
    queryFn: () => fetchAuthors(params),
    staleTime: 20 * 60 * 1000,
  });

  const prefetchAuthor = (id: string) => ({
    queryKey: createAuthorQueryKey(id),
    queryFn: () => fetchAuthor(id),
    staleTime: 30 * 60 * 1000,
  });

  const prefetchAuthorByUsername = (username: string) => ({
    queryKey: createAuthorByUsernameQueryKey(username),
    queryFn: () => fetchAuthorByUsername(username),
    staleTime: 30 * 60 * 1000,
  });

  return {
    prefetchAuthors,
    prefetchAuthor,
    prefetchAuthorByUsername,
  };
};

/**
 * 作成者キャッシュ無効化用ユーティリティ型
 */
export type AuthorQueryInvalidation = {
  type: 'all' | 'list' | 'detail' | 'search';
  id?: string;
  username?: string;
  params?: MicroCMSQueries;
};
