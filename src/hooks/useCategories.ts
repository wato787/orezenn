import { fetchCategories, fetchCategory } from '@/lib/microcms';
import type { CategorySearchParams } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

/**
 * カテゴリ一覧取得フック
 */
export const useCategories = (params?: CategorySearchParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
    staleTime: 5 * 60 * 1000, // 5分
  });
};

/**
 * カテゴリ詳細取得フック
 */
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5分
  });
};

/**
 * QueryKey用ヘルパー
 */
export const categoriesQueryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesQueryKeys.all, 'list'] as const,
  list: (params?: CategorySearchParams) => [...categoriesQueryKeys.lists(), params] as const,
  details: () => [...categoriesQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoriesQueryKeys.details(), id] as const,
};
