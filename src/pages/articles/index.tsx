import { ArticleCard } from "@/components/articles/ArticleCard";
import {
  ArticleListEmpty,
  ArticleListError,
  ArticleListLoading,
} from "@/components/articles/ArticleListState";
import { Pagination } from "@/components/ui/Pagination";
import { useArticles } from "@/hooks";
import type { ArticleSearchParams } from "@/types/api";
import { useState } from "react";
import { ArticleListHeader } from "./components";

interface ArticleListPageProps {
  pageSize?: number;
}

/**
 * 記事一覧ページ（ページネーション付き）
 */
export const ArticleListPage = ({ pageSize = 9 }: ArticleListPageProps) => {
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
      <ArticleListHeader
        totalCount={articlesData?.totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        isPending={isPending}
      />

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
