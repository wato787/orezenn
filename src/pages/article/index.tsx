import { ArticleListError } from "@/components/articles/ArticleListState";
import { ContentRenderer } from "@/components/markdown";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useArticle, useRelatedArticles } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArticleDetailSkeleton,
  ArticleMetaInfo,
  ArticleTitle,
  RelatedArticles,
} from "./components";

/**
 * 記事詳細ページ
 */
export const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // IDが存在しない場合は記事一覧へリダイレクト
  if (!slug) {
    return <Navigate to="/articles" replace />;
  }

  // IDで記事を取得
  const { data: article, isPending, error, refetch } = useArticle(slug);

  const { data: relatedArticles, isPending: relatedPending } =
    useRelatedArticles(article?.id || "", 4, {
      enabled: !!article?.id,
    });

  // ローディング状態
  if (isPending) {
    return <ArticleDetailSkeleton />;
  }

  // エラー状態
  if (error) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <ArticleListError
            error={error as unknown as Error}
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  // 記事が見つからない場合
  if (!article) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold">記事が見つかりません</h1>
          <p className="text-muted-foreground">
            指定された記事は存在しないか、削除された可能性があります。
          </p>
          <Button asChild>
            <Link to="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              記事一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/articles" },
    { label: article.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* スティッキーメタ情報 */}
      <ArticleMetaInfo article={article} />

      <div className="container mx-auto max-w-4xl">
        {/* パンくずリスト */}
        <div className="py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* 記事タイトル・タグ */}
        <ArticleTitle article={article} />

        {/* 記事本文 */}
        <div className="mb-16">
          <ContentRenderer content={article.content} />
        </div>

        {/* 関連記事 */}
        <div className="border-t border-border pt-12">
          <RelatedArticles
            articles={relatedArticles || []}
            isPending={relatedPending}
          />
        </div>

        {/* ナビゲーション */}
        <div className="flex justify-center pt-12 pb-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              記事一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
