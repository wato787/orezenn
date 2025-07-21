import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type { ArticlesResponse, CategoriesResponse } from '../types/api';

// 環境変数のバリデーション
const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error(
    'microCMS設定が不完全です。以下の環境変数を設定してください:\n' +
    '- VITE_MICROCMS_SERVICE_DOMAIN\n' +
    '- VITE_MICROCMS_API_KEY'
  );
}

// microCMSクライアントを作成
export const microCMSClient = createClient({
  serviceDomain,
  apiKey,
});

/**
 * 型安全なAPI呼び出し用ヘルパー関数
 */
export const fetchFromMicroCMS = async <T>(
  endpoint: string,
  queries?: MicroCMSQueries
): Promise<T> => {
  try {
    const response = await microCMSClient.get<T>({
      endpoint,
      queries,
    });
    return response;
  } catch (error) {
    console.error(`microCMS API Error (${endpoint}):`, error);
    throw new Error(`データの取得に失敗しました: ${endpoint}`);
  }
};

/**
 * 記事一覧取得用のヘルパー関数
 */
export const fetchArticles = async (queries?: MicroCMSQueries): Promise<ArticlesResponse> => {
  return fetchFromMicroCMS<ArticlesResponse>('articles', queries);
};

/**
 * 記事詳細取得用のヘルパー関数
 */
export const fetchArticle = async (id: string, queries?: MicroCMSQueries) => {
  return fetchFromMicroCMS(`articles/${id}`, queries);
};

/**
 * カテゴリ一覧取得用のヘルパー関数
 */
export const fetchCategories = async (queries?: MicroCMSQueries): Promise<CategoriesResponse> => {
  return fetchFromMicroCMS<CategoriesResponse>('categories', queries);
};
