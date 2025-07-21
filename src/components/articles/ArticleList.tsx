import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useArticles, useCategories } from "@/hooks";
import type { ArticleSearchParams } from "@/types/api";
import { Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";
import {
  ArticleListEmpty,
  ArticleListError,
  ArticleListLoading,
} from "./ArticleListState";

interface ArticleListProps {
  title?: string;
  description?: string;
  initialParams?: Partial<ArticleSearchParams>;
  showHeader?: boolean;
  showFilters?: boolean;
  showViewToggle?: boolean;
  variant?: "default" | "compact";
  pageSize?: number;
}

/**
 * 記事一覧コンポーネント（検索・フィルタ・ページネーション機能付き）
 */
export const ArticleList = ({
  title = "記事一覧",
  description = "技術記事・ナレッジを探索しよう",
  initialParams = {},
  showHeader = true,
  showFilters = true,
  showViewToggle = true,
  variant = "default",
  pageSize = 9,
}: ArticleListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (searchParams.get("view") as "grid" | "list") || "grid"
  );

  // 検索・フィルタパラメータの構築
  const articleParams = useMemo<ArticleSearchParams>(
    () => ({
      ...initialParams,
      q: searchQuery || undefined,
      categorySlug: selectedCategory || undefined,
      status: "published",
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      orders: "-publishedAt",
    }),
    [searchQuery, selectedCategory, currentPage, pageSize, initialParams]
  );

  // データ取得
  const {
    data: articlesData,
    isLoading: articlesLoading,
    error: articlesError,
    refetch: refetchArticles,
  } = useArticles(articleParams);

  const { data: categoriesData } = useCategories(
    { isPublished: true, limit: 20 },
    { enabled: showFilters }
  );

  // ページネーション計算
  const totalPages = articlesData
    ? Math.ceil(articlesData.totalCount / pageSize)
    : 0;

  // 検索実行
  const handleSearch = () => {
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set("q", searchQuery);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  // フィルタ変更
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      newParams.set("category", categorySlug);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  // 表示モード変更
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("view", mode);
    setSearchParams(newParams);
  };

  // 検索クリア
  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setCurrentPage(1);
    setSearchParams({});
  };

  // ページ変更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // エラー状態
  if (articlesError) {
    return (
      <div className="container py-8">
        <ArticleListError
          error={articlesError as unknown as Error}
          onRetry={refetchArticles}
        />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      {/* ヘッダー */}
      {showHeader && (
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {/* 検索・フィルタ */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              検索・フィルタ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 検索バー */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="記事を検索..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && handleSearch()
                  }
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>検索</Button>
            </div>

            {/* カテゴリフィルタ */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("")}
              >
                すべて
              </Button>
              {categoriesData?.contents.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.slug ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryChange(category.slug)}
                  className="text-xs"
                >
                  {category.emoji && (
                    <span className="mr-1">{category.emoji}</span>
                  )}
                  {category.name}
                </Button>
              ))}
            </div>

            {/* 検索結果情報 */}
            {(searchQuery || selectedCategory) && (
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {articlesData?.totalCount || 0} 件の記事が見つかりました
                </span>
                <Button variant="ghost" size="sm" onClick={clearSearch}>
                  検索をクリア
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 表示切り替え・結果情報 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {articlesData && (
            <span>
              {articlesData.totalCount} 件中{" "}
              {Math.min(
                articlesData.totalCount,
                (currentPage - 1) * pageSize + 1
              )}{" "}
              - {Math.min(articlesData.totalCount, currentPage * pageSize)}{" "}
              件を表示
            </span>
          )}
        </div>

        {showViewToggle && (
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* 記事一覧 */}
      {articlesLoading ? (
        <ArticleListLoading count={pageSize} />
      ) : !articlesData?.contents.length ? (
        <ArticleListEmpty
          searchQuery={
            searchQuery || selectedCategory
              ? `${searchQuery} ${selectedCategory}`.trim()
              : undefined
          }
          onClearSearch={clearSearch}
        />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {articlesData.contents.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant={viewMode === "list" ? "compact" : variant}
              showAuthor={true}
              showExcerpt={viewMode === "grid"}
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
