import { ArticleHeader } from "@/components/articles";
import { ArticleListError } from "@/components/articles/ArticleListState";
import { MarkdownRenderer } from "@/components/markdown";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useArticle, useArticleBySlug, useRelatedArticles } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArticleDebugInfo,
  ArticleDetailSkeleton,
  RelatedArticles,
} from "./components";

/**
 * 記事詳細ページ
 */
export const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // slugが存在しない場合は記事一覧へリダイレクト
  if (!slug) {
    return <Navigate to="/articles" replace />;
  }

  // slugがIDパターン（microCMSのID形式）かどうかを判定
  const isId = /^[a-z0-9_-]{12}$/.test(slug);

  // 適切なフックを使用
  const bySlug = useArticleBySlug(slug, { enabled: !isId });
  const byId = useArticle(slug, { enabled: isId });

  // 使用する結果を選択
  const { data: article, isPending, error, refetch } = isId ? byId : bySlug;

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
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* パンくずリスト */}
        <Breadcrumb items={breadcrumbItems} />

        {/* 記事ヘッダー */}
        <ArticleHeader article={article} />

        <Separator />

        {/* デバッグ情報 */}
        <ArticleDebugInfo
          slug={slug}
          isId={isId}
          article={article}
          error={error as Error | null}
        />

        {/* 記事本文 */}
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <MarkdownRenderer content={article.content} />
        </article>

        <Separator />

        {/* 関連記事 */}
        <RelatedArticles
          articles={relatedArticles || []}
          isPending={relatedPending}
        />

        {/* ナビゲーション */}
        <div className="flex justify-center pt-8">
          <Button asChild variant="outline">
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
