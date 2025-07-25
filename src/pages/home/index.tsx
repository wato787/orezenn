import { ArticleCard } from "@/components/articles";
import { SectionLoadingSpinner } from "@/components/ui/loading-spinner";
import { useArticles } from "@/hooks";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const {
    data: articlesResponse,
    isPending,
    error,
  } = useArticles({
    limit: 6,
    orders: "-publishedAt",
  });
  const articles = articlesResponse?.contents || [];

  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900">最新記事</h1>
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
            <div className="p-6 bg-gray-100 rounded-2xl inline-block mb-6">
              <FileText className="h-16 w-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              記事がありません
            </h3>
            <p className="text-gray-600">まだ記事が投稿されていません</p>
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
