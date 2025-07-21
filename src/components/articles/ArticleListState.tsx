import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, FileText, Loader2, Search } from "lucide-react";

/**
 * 記事カードのスケルトンコンポーネント
 */
export const ArticleCardSkeleton = () => (
  <Card className="animate-pulse">
    <div className="aspect-video w-full bg-muted rounded-t-lg" />
    <CardHeader className="space-y-3">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
        <div className="h-6 bg-muted rounded-full w-20" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-muted rounded-full" />
          <div className="h-3 bg-muted rounded w-24" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-18" />
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * 記事一覧のローディング状態
 */
interface ArticleListLoadingProps {
  count?: number;
}

export const ArticleListLoading = ({ count = 6 }: ArticleListLoadingProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>記事を読み込み中...</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

/**
 * 記事一覧のエラー状態
 */
interface ArticleListErrorProps {
  error: Error;
  onRetry?: () => void;
}

export const ArticleListError = ({ error, onRetry }: ArticleListErrorProps) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Card className="max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold">記事の読み込みに失敗しました</h3>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground text-sm">
          {error.message || "データの取得中にエラーが発生しました"}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            再試行
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

/**
 * 記事一覧の空状態
 */
interface ArticleListEmptyProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const ArticleListEmpty = ({
  searchQuery,
  onClearSearch,
}: ArticleListEmptyProps) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Card className="max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-muted rounded-full">
            {searchQuery ? (
              <Search className="h-8 w-8 text-muted-foreground" />
            ) : (
              <FileText className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold">
          {searchQuery ? "検索結果が見つかりません" : "まだ記事がありません"}
        </h3>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground text-sm">
          {searchQuery
            ? `「${searchQuery}」に一致する記事が見つかりませんでした`
            : "最初の記事を投稿してみましょう"}
        </p>
        {searchQuery && onClearSearch && (
          <Button onClick={onClearSearch} variant="outline">
            検索をクリア
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

/**
 * コンパクト表示用のスケルトン
 */
export const ArticleCardSkeletonCompact = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-5 bg-muted rounded w-1/2" />
          <div className="flex items-center gap-4 mt-2">
            <div className="h-3 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        </div>
        <div className="w-20 h-16 bg-muted rounded-md flex-shrink-0" />
      </div>
    </CardHeader>
  </Card>
);

/**
 * コンパクト表示用のローディング
 */
export const ArticleListLoadingCompact = ({
  count = 8,
}: ArticleListLoadingProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>読み込み中...</span>
      </div>
    </div>

    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeletonCompact key={index} />
      ))}
    </div>
  </div>
);
