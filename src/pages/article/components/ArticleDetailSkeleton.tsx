import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";

export const ArticleDetailSkeleton = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <SectionLoadingSpinner text="記事を読み込み中..." />
      </div>
    </div>
  );
};
