import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export const ArticleDetailSkeleton = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* パンくずリスト スケルトン */}
        <div className="flex items-center gap-2 text-sm">
          <Skeleton variant="text" size="sm" width="64px" />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Skeleton variant="text" size="sm" width="80px" />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Skeleton variant="text" size="sm" width="128px" />
        </div>

        {/* 記事ヘッダー スケルトン */}
        <div className="space-y-4">
          <Skeleton variant="text" size="xl" width="75%" height="40px" />
          <div className="flex items-center gap-4">
            <Skeleton variant="text" size="sm" width="96px" />
            <Skeleton variant="text" size="sm" width="80px" />
            <Skeleton variant="text" size="sm" width="64px" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="rounded" height="24px" width="64px" />
            <Skeleton variant="rounded" height="24px" width="80px" />
          </div>
        </div>

        {/* コンテンツ スケルトン */}
        <div className="space-y-4">
          <SkeletonText lines={5} />
          <div className="space-y-3">
            <Skeleton variant="rounded" height="200px" width="100%" />
            <SkeletonText lines={3} />
            <Skeleton variant="rounded" height="150px" width="100%" />
            <SkeletonText lines={4} />
          </div>
        </div>
      </div>
    </div>
  );
};
