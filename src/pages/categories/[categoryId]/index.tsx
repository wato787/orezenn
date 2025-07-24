import { ArticleCard } from "@/components/articles";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import { Pagination } from "@/components/ui/Pagination";
import { useArticles, useCategory } from "@/hooks";
import { ArrowLeft, FileText, FolderOpen } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

export const CategoryArticlesPage = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const {
    data: category,
    isPending: isCategoryPending,
    error: categoryError,
  } = useCategory(categoryId || "");

  const {
    data: articlesResponse,
    isPending: isArticlesPending,
    error: articlesError,
  } = useArticles({
    categoryId,
    limit,
    offset,
    orders: "-publishedAt",
  });

  const isPending = isCategoryPending || isArticlesPending;
  const error = categoryError || articlesError;

  if (isPending) {
    return (
      <div className="container py-8">
        <SectionLoadingSpinner text="記事を読み込み中..." />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container py-8">
        <div className="text-center py-16">
          <div className="p-6 bg-destructive/5 rounded-3xl inline-block mb-6">
            <FolderOpen className="h-16 w-16 text-destructive mx-auto" />
          </div>
          <div className="text-destructive text-xl font-semibold mb-3">
            エラーが発生しました
          </div>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            {!category
              ? "カテゴリが見つかりません"
              : "記事の取得に失敗しました"}
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            カテゴリ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const articles = articlesResponse?.contents || [];
  const totalCount = articlesResponse?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // パンくずリストのアイテム
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "カテゴリ", href: "/categories" },
    { label: category.name },
  ];

  return (
    <div className="container py-8 max-w-7xl">
      {/* パンくずリスト */}
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} className="text-sm" />
      </div>

      {/* 記事一覧 */}
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <div className="p-6 bg-muted/30 rounded-3xl inline-block mb-6">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            記事がありません
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            このカテゴリには記事がまだ投稿されていません。
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            他のカテゴリを見る
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 記事グリッド - 横幅を活用 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* 最初の記事は大きく表示 */}
            {articles.length > 0 && (
              <div className="lg:col-span-2 xl:col-span-1">
                <ArticleCard article={articles[0]} variant="featured" />
              </div>
            )}

            {/* 残りの記事は通常サイズ */}
            {articles.slice(1).map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} variant="default" />
              </div>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                className="justify-center"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
