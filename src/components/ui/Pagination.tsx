import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * レスポンシブ対応のページネーションコンポーネント
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className,
}: PaginationProps) => {
  // ページネーションで表示するページ番号を計算
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 開始ページの調整
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // 最初のページと省略記号
    if (showFirstLast && startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis");
      }
    }

    // 可視ページ
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 最後のページと省略記号
    if (showFirstLast && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="ページネーション"
      className={cn("flex items-center justify-center", className)}
    >
      <div className="flex items-center gap-1">
        {/* 前のページボタン */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="前のページ"
          className="h-9 px-3"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only ml-1">前へ</span>
        </Button>

        {/* ページ番号 */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              );
            }

            const isActive = page === currentPage;
            return (
              <Button
                key={page}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                aria-label={`ページ ${page}${
                  isActive ? " (現在のページ)" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
                className="h-9 w-9"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* 次のページボタン */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="次のページ"
          className="h-9 px-3"
        >
          <span className="sr-only sm:not-sr-only mr-1">次へ</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* ページ情報（小画面では非表示） */}
      <div className="hidden md:block ml-4 text-sm text-muted-foreground">
        {currentPage} / {totalPages} ページ
      </div>
    </nav>
  );
};
