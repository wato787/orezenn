import { ArticleCard } from "@/components/articles";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import { Pagination } from "@/components/ui/Pagination";
import { useArticles, useCategory } from "@/hooks";
import { ArrowLeft, FileText, FolderOpen, Hash } from "lucide-react";
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

      {/* カテゴリヘッダー */}
      <div className="mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
              <Hash className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {category.name}
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span className="font-medium">{totalCount}件の記事</span>
          </div>
        </div>
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
        <div className="space-y-12">
          {/* セクションタイトル */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">記事一覧</h2>
          </div>

          {/* 記事グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
