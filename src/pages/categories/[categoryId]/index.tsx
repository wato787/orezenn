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
    status: "published",
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
        <div className="text-center">
          <div className="text-destructive text-lg font-semibold mb-2">
            エラーが発生しました
          </div>
          <p className="text-muted-foreground mb-4">
            {!category
              ? "カテゴリが見つかりません"
              : "記事の取得に失敗しました"}
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
    <div className="container py-8">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* カテゴリヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FolderOpen className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold truncate">{category.name}</h1>
          </div>
        </div>

        {/* 記事数 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{totalCount}件の記事</span>
        </div>
      </div>

      {/* 記事一覧 */}
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">記事がありません</h2>
          <p className="text-muted-foreground mb-4">
            このカテゴリには記事がまだ投稿されていません。
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            他のカテゴリを見る
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
              />
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                className="justify-center"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
