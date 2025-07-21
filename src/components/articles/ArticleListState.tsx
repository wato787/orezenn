import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
} from "@/components/ui/skeleton";
import { AlertCircle, FileText, Search } from "lucide-react";

/**
 * 記事カードのスケルトンコンポーネント
 */
export const ArticleCardSkeleton = () => (
  <Card>
    <Skeleton variant="rounded" height="200px" className="rounded-t-lg" />
    <CardHeader className="space-y-3">
      <div className="space-y-2">
        <SkeletonText size="lg" width="75%" />
        <SkeletonText size="md" width="50%" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton variant="text" size="sm" width="96px" />
          <Skeleton variant="text" size="sm" width="64px" />
        </div>
        <Skeleton variant="rounded" height="24px" width="80px" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SkeletonAvatar size="sm" />
          <Skeleton variant="text" size="sm" width="96px" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" height="24px" width="64px" />
          <Skeleton variant="rounded" height="24px" width="80px" />
          <Skeleton variant="rounded" height="24px" width="72px" />
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
    <SectionLoadingSpinner text="記事を読み込み中..." />

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
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <SkeletonText size="lg" width="75%" />
          <SkeletonText size="lg" width="50%" />
          <div className="flex items-center gap-4 mt-2">
            <Skeleton variant="text" size="sm" width="96px" />
            <Skeleton variant="text" size="sm" width="64px" />
          </div>
        </div>
        <Skeleton
          variant="rounded"
          width="80px"
          height="64px"
          className="flex-shrink-0"
        />
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
    <SectionLoadingSpinner text="読み込み中..." />

    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeletonCompact key={index} />
      ))}
    </div>
  </div>
);
