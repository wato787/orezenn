import { CategoryCard } from "@/components/categories";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import { useCategories } from "@/hooks";
import { FolderOpen } from "lucide-react";

export const CategoriesPage = () => {
  const { data: categoriesResponse, isPending, error } = useCategories();

  if (isPending) {
    return (
      <div className="container py-8">
        <SectionLoadingSpinner text="カテゴリを読み込み中..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <div className="p-4 bg-destructive/5 rounded-2xl inline-block mb-4">
            <FolderOpen className="h-12 w-12 text-destructive mx-auto" />
          </div>
          <div className="text-destructive text-lg font-semibold mb-2">
            エラーが発生しました
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            カテゴリの取得に失敗しました。しばらく時間をおいて再試行してください。
          </p>
        </div>
      </div>
    );
  }

  const categories = categoriesResponse?.contents || [];

  if (categories.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-16">
          <div className="p-6 bg-muted/30 rounded-3xl inline-block mb-6">
            <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            カテゴリがありません
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            まだカテゴリが作成されていません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      {/* カテゴリ一覧 */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            すべてのカテゴリ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              variant="default"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
