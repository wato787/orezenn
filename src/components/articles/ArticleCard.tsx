import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import type { Article } from "@/types/api";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/date";
import { Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured";
  showAuthor?: boolean;
  showExcerpt?: boolean;
  showTags?: boolean;
  showStats?: boolean;
  className?: string;
}

/**
 * Zenn/Qiitaライクなデザインの記事カードコンポーネント
 */
export const ArticleCard = ({
  article,
  variant = "default",
  showAuthor = true,
  showExcerpt = true,
  showTags = true,
  className,
}: ArticleCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return "hover:shadow-md transition-shadow";
      case "featured":
        return "border-primary/20 bg-primary/5 hover:shadow-lg transition-all";
      default:
        return "hover:shadow-md transition-shadow";
    }
  };

  const getCardContent = () => {
    if (variant === "compact") {
      return (
        <>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Link to={`/articles/${article.id}`} className="group">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.emoji && (
                      <span className="mr-2">{article.emoji}</span>
                    )}
                    {article.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(article.publishedAt || article.createdAt)}
                    </span>
                  </div>

                  {article.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readingTime}分</span>
                    </div>
                  )}
                </div>
              </div>

              {article.eyecatch && (
                <Link to={`/articles/${article.id}`} className="flex-shrink-0">
                  <img
                    src={article.eyecatch.url}
                    alt={article.title}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                </Link>
              )}
            </div>
          </CardHeader>
        </>
      );
    }

    return (
      <>
        {article.eyecatch && (
          <Link to={`/articles/${article.id}`}>
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={article.eyecatch.url}
                alt={article.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
        )}

        <CardHeader className="space-y-3">
          <div>
            <Link to={`/articles/${article.id}`} className="group">
              <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
                {article.emoji && <span className="mr-2">{article.emoji}</span>}
                {article.title}
              </h3>
            </Link>

            {showExcerpt && article.excerpt && (
              <CardDescription className="mt-3 line-clamp-3">
                {article.excerpt}
              </CardDescription>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
              </div>

              {article.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime}分</span>
                </div>
              )}
            </div>

            {article.category && (
              <Link
                to={`/categories/${article.category.slug}`}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                {article.category.name}
              </Link>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {showAuthor && article.author && (
              <Link
                to={`/authors/${article.author.username}`}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <img
                  src={article.author.avatar?.url || "/default-avatar.png"}
                  alt={article.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{article.author.name}</span>
              </Link>
            )}

            {showTags && article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tags/${tag.slug}`}
                    className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag.name}
                  </Link>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{article.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {article.techStack && article.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {article.techStack.length > 4 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{article.techStack.length - 4}
                  </span>
                )}
              </div>
            )}

            {variant === "featured" && (
              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/articles/${article.slug}`}>記事を読む</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <Card
      className={cn(getVariantStyles(), className)}
      data-testid="article-card"
    >
      {getCardContent()}
    </Card>
  );
};
