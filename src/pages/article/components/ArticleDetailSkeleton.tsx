import { ChevronRight } from "lucide-react";

export const ArticleDetailSkeleton = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* パンくずリスト スケルトン */}
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>

        {/* 記事ヘッダー スケルトン */}
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          </div>
        </div>

        {/* コンテンツ スケルトン */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
