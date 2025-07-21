import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient のデフォルト設定
 * ブログアプリケーション用に最適化（クライアントサイド専用）
 */
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // データが古くなるまでの時間（5分）
        staleTime: 5 * 60 * 1000,
        // ガベージコレクション時間（30分）
        gcTime: 30 * 60 * 1000,
        // エラー時のリトライ回数
        retry: 2,
        // リトライ間隔（指数関数的増加）
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // ネットワーク再接続時の自動再取得
        refetchOnReconnect: true,
        // ウィンドウフォーカス時の自動再取得（無効化）
        refetchOnWindowFocus: false,
      },
      mutations: {
        // ミューテーション時のリトライ回数
        retry: 1,
        // エラー時のリトライ間隔
        retryDelay: 1000,
      },
    },
  });
};

// クライアントサイド用のQueryClientインスタンス（シングルトン）
let queryClient: QueryClient | undefined = undefined;

/**
 * QueryClient インスタンスを取得
 * クライアントサイドで単一インスタンスを再利用
 */
export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  return queryClient;
};
