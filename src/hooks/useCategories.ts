import {
  fetchCategories,
  fetchCategory,
  fetchCategoryBySlug
} from '@/lib/microcms';
import type {
  ApiError,
  CategoriesResponse,
  Category,
  CategorySearchParams
} from '@/types/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

// カテゴリ一覧のクエリキー生成
export const createCategoriesQueryKey = (params?: CategorySearchParams) =>
  ['categories', params] as const;

// カテゴリ詳細のクエリキー生成
export const createCategoryQueryKey = (id: string) =>
  ['categories', 'detail', id] as const;

// スラッグベースカテゴリ詳細のクエリキー生成
export const createCategoryBySlugQueryKey = (slug: string) =>
  ['categories', 'slug', slug] as const;

/**
 * カテゴリ一覧取得フック
 */
export const useCategories = (
  params?: CategorySearchParams,
  options?: Omit<UseQueryOptions<CategoriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createCategoriesQueryKey(params),
    queryFn: () => fetchCategories(params),
    staleTime: 15 * 60 * 1000, // 15分（カテゴリは変更頻度が低い）
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

/**
 * カテゴリ詳細取得フック（ID指定）
 */
export const useCategory = (
  id: string,
  options?: Omit<UseQueryOptions<Category, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createCategoryQueryKey(id),
    queryFn: () => fetchCategory(id),
    staleTime: 30 * 60 * 1000, // 30分
    enabled: Boolean(id),
    ...options,
  });
};

/**
 * カテゴリ詳細取得フック（スラッグ指定）
 */
export const useCategoryBySlug = (
  slug: string,
  options?: Omit<UseQueryOptions<Category, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: createCategoryBySlugQueryKey(slug),
    queryFn: () => fetchCategoryBySlug(slug),
    staleTime: 30 * 60 * 1000, // 30分
    enabled: Boolean(slug),
    retry: (failureCount, error) => {
      // 404エラーの場合はリトライしない
      if ((error as ApiError)?.status === 404) return false;
      return failureCount < 2;
    },
    ...options,
  });
};

/**
 * 公開済みカテゴリ一覧取得フック
 */
export const usePublishedCategories = (
  additionalParams?: Omit<CategorySearchParams, 'isPublished'>,
  options?: Omit<UseQueryOptions<CategoriesResponse, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useCategories(
    {
      isPublished: true,
      orders: 'sortOrder', // ソート順で並び替え
      ...additionalParams,
    },
    options
  );
};

/**
 * カテゴリプリフェッチ用ユーティリティ
 */
export const useCategoryPrefetch = () => {
  const prefetchCategories = (params?: CategorySearchParams) => ({
    queryKey: createCategoriesQueryKey(params),
    queryFn: () => fetchCategories(params),
    staleTime: 15 * 60 * 1000,
  });

  const prefetchCategory = (id: string) => ({
    queryKey: createCategoryQueryKey(id),
    queryFn: () => fetchCategory(id),
    staleTime: 30 * 60 * 1000,
  });

  const prefetchCategoryBySlug = (slug: string) => ({
    queryKey: createCategoryBySlugQueryKey(slug),
    queryFn: () => fetchCategoryBySlug(slug),
    staleTime: 30 * 60 * 1000,
  });

  return {
    prefetchCategories,
    prefetchCategory,
    prefetchCategoryBySlug,
  };
};

/**
 * カテゴリキャッシュ無効化用ユーティリティ型
 */
export type CategoryQueryInvalidation = {
  type: 'all' | 'list' | 'detail';
  id?: string;
  slug?: string;
  params?: CategorySearchParams;
};
