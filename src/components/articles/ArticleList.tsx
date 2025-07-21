import { Pagination } from "@/components/ui/Pagination";
import { useArticles } from "@/hooks";
import type { ArticleSearchParams } from "@/types/api";
import { useState } from "react";
import { ArticleCard } from "./ArticleCard";
import {
  ArticleListEmpty,
  ArticleListError,
  ArticleListLoading,
} from "./ArticleListState";

interface ArticleListProps {
  pageSize?: number;
}

/**
 * 記事一覧コンポーネント（ページネーション付き）
 */
export const ArticleList = ({ pageSize = 9 }: ArticleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // TanStack QueryとmicroCMS SDKを使用
  const articleParams: ArticleSearchParams = {
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    orders: "-createdAt",
  };

  const {
    data: articlesData,
    isPending,
    error,
    refetch,
  } = useArticles(articleParams);

  // ページネーション計算
  const totalPages = articlesData
    ? Math.ceil(articlesData.totalCount / pageSize)
    : 0;

  // ページ変更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // エラー状態
  if (error) {
    return (
      <div className="container py-8">
        <ArticleListError error={error as unknown as Error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      {/* ヘッダー */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">記事一覧</h1>
        <p className="text-muted-foreground">
          {articlesData
            ? `${articlesData.totalCount} 件の記事があります`
            : "技術記事・ナレッジを探索しよう"}
        </p>
      </div>

      {/* 表示情報 */}
      {articlesData && !isPending && (
        <div className="text-sm text-muted-foreground text-center">
          {articlesData.totalCount} 件中{" "}
          {Math.min(articlesData.totalCount, (currentPage - 1) * pageSize + 1)}{" "}
          - {Math.min(articlesData.totalCount, currentPage * pageSize)} 件を表示
        </div>
      )}

      {/* 記事一覧 */}
      {isPending ? (
        <ArticleListLoading count={pageSize} />
      ) : !articlesData?.contents.length ? (
        <ArticleListEmpty />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.contents.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="default"
              showAuthor={true}
              showExcerpt={true}
              showTags={true}
            />
          ))}
        </div>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="pt-8"
        />
      )}
    </div>
  );
};
