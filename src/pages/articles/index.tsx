import {
  ArticleCard,
  ArticleListEmpty,
  ArticleListError,
  ArticleListLoading,
  CategoryFilter,
  SearchBox,
} from "@/components/articles";
import { Pagination } from "@/components/ui";
import { useArticles } from "@/hooks";
import type { ArticleSearchParams } from "@/types/api";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ArticleListPageProps {
  pageSize?: number;
}

/**
 * 記事一覧ページ（検索・フィルタ・ページネーション付き）
 */
export const ArticleListPage = ({ pageSize = 9 }: ArticleListPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URLパラメータから初期値を取得
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );

  // URLパラメータを更新する関数
  const updateURLParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // 検索・フィルタパラメータを構築
  const buildSearchParams = useCallback((): ArticleSearchParams => {
    const params: ArticleSearchParams = {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      orders: "-createdAt",
    };

    // 検索クエリ
    if (searchQuery.trim()) {
      params.q = searchQuery.trim();
    }

    return params;
  }, [currentPage, pageSize, searchQuery]);

  // TanStack QueryとmicroCMS SDKを使用
  const {
    data: articlesData,
    isPending,
    error,
    refetch,
  } = useArticles(buildSearchParams());

  // ページネーション計算
  const totalPages = articlesData
    ? Math.ceil(articlesData.totalCount / pageSize)
    : 0;

  // ページ変更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURLParams({ page: page.toString() });
  };

  // 検索変更
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateURLParams({ q: query || undefined, page: undefined });
  };

  // フィルタクリア
  const handleClearFilters = () => {
    setSearchQuery("");
    updateURLParams({ q: undefined, page: undefined });
  };

  // エラー時の再試行
  const handleRetry = () => {
    refetch();
  };

  // アクティブフィルタの確認
  const hasActiveFilters = searchQuery.trim() !== "";

  // エラー状態
  if (error) {
    return (
      <div className="container py-8">
        <ArticleListError
          error={error as unknown as Error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      {/* 検索・フィルタ */}
      <div className="space-y-4">
        <SearchBox
          onSearch={handleSearchChange}
          placeholder="タイトル、内容、タグで検索..."
          className="max-w-md"
        />
        <div className="flex flex-wrap items-center gap-4">
          <CategoryFilter />
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              フィルタをクリア
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>フィルタ:</span>
            {searchQuery.trim() && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                検索: "{searchQuery.trim()}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* 記事一覧 */}
      {isPending ? (
        <ArticleListLoading count={pageSize} />
      ) : !articlesData?.contents.length ? (
        <ArticleListEmpty
          searchQuery={searchQuery.trim() || undefined}
          onClearSearch={handleClearFilters}
        />
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
          totalCount={articlesData?.totalCount}
          pageSize={pageSize}
          showArticleInfo={true}
          className="pt-8"
        />
      )}
    </div>
  );
};
