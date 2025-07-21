import type { Article } from "@/types/api";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleMetaInfoProps {
  article: Article;
}

export const ArticleMetaInfo = ({ article }: ArticleMetaInfoProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-4xl mx-auto py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* 左側：基本メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
            </div>

            {article.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime}分で読めます</span>
              </div>
            )}
          </div>

          {/* 右側：作成者情報 */}
          {article.author && (
            <Link
              to={`/authors/${article.author.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              {article.author.avatar && (
                <img
                  src={article.author.avatar.url}
                  alt={article.author.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <div className="flex items-center gap-1 text-sm">
                <User className="h-3 w-3" />
                <span className="font-medium">{article.author.name}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
