import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleListLoading } from "@/components/articles/ArticleListState";
import type { Article } from "@/types/api";

interface RelatedArticlesProps {
  articles: Article[];
  isPending: boolean;
}

export const RelatedArticles = ({
  articles,
  isPending,
}: RelatedArticlesProps) => {
  if (!articles?.length && !isPending) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">関連記事</h2>

      {isPending ? (
        <ArticleListLoading count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="compact"
              showAuthor={false}
              showExcerpt={true}
              showTags={false}
            />
          ))}
        </div>
      )}
    </section>
  );
};
