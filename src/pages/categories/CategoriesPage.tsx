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
        <div className="text-center">
          <div className="text-destructive text-lg font-semibold mb-2">
            エラーが発生しました
          </div>
          <p className="text-muted-foreground">
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
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">カテゴリがありません</h2>
          <p className="text-muted-foreground">
            まだカテゴリが作成されていません。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FolderOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">カテゴリ</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          記事をカテゴリ別に閲覧できます。気になるカテゴリをクリックしてみてください。
        </p>
      </div>

      {/* カテゴリ統計 */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {categories.length}
          </div>
          <div className="text-sm text-muted-foreground">カテゴリ数</div>
        </div>
      </div>

      {/* カテゴリ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
};
