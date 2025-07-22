import { ArticleCard } from "@/components/articles";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import { useLatestArticles } from "@/hooks";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { data: articlesResponse, isPending, error } = useLatestArticles(6);
  const articles = articlesResponse || [];

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            <h1 className="text-3xl font-bold">最新記事</h1>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            すべて見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isPending ? (
          <div className="flex justify-center py-12">
            <SectionLoadingSpinner text="記事を読み込み中..." />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              記事の読み込みに失敗しました
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-6 bg-muted/30 rounded-3xl inline-block mb-6">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">記事がありません</h3>
            <p className="text-muted-foreground">
              まだ記事が投稿されていません
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
