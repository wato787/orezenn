import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import type { Article } from "@/types/api";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/date";
import { Calendar, Clock, ImageOff, Tag } from "lucide-react";
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

                <div className="mt-2">
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
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {article.categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/categories/${cat.id}`}
                          className="inline-block rounded-lg bg-primary/10 text-primary text-sm px-3 py-1.5 font-semibold"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* コンパクト表示の画像エリア */}
              <Link to={`/articles/${article.id}`} className="flex-shrink-0">
                <div className="w-20 h-16 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                  {article.eyecatch ? (
                    <img
                      src={article.eyecatch.url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              </Link>
            </div>
          </CardHeader>
        </>
      );
    }

    return (
      <>
        {/* 画像エリア（必ず表示） */}
        <Link to={`/articles/${article.id}`}>
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
            {article.eyecatch ? (
              <img
                src={article.eyecatch.url}
                alt={article.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageOff className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm">画像なし</div>
              </div>
            )}
          </div>
        </Link>

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

          {/* 日付・読書時間・カテゴリバッジを縦並びに */}
          <div className="mt-2">
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
            {article.categories && article.categories.length > 0 && (
              <div className="flex gap-2 mt-2">
                {article.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.id}`}
                    className="inline-block rounded-full bg-black text-white text-sm px-3 py-1.5 "
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
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
