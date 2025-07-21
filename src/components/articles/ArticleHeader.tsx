import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/types/api";
import {
  Calendar,
  Clock,
  ExternalLink,
  Github,
  Globe,
  Tag,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleHeaderProps {
  article: Article;
  showExternalLinks?: boolean;
}

export const ArticleHeader = ({
  article,
  showExternalLinks = true,
}: ArticleHeaderProps) => {
  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {article.emoji && <span className="mr-3">{article.emoji}</span>}
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* メタ情報 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
        </div>

        {article.readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{article.readingTime}分で読めます</span>
          </div>
        )}

        {article.author && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <Link
              to={`/authors/${article.author.username}`}
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              {article.author.avatar && (
                <img
                  src={article.author.avatar.url}
                  alt={article.author.name}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span>{article.author.name}</span>
            </Link>
          </div>
        )}
      </div>

      {/* カテゴリ・タグ・技術スタック */}
      <div className="space-y-3">
        {article.category && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">カテゴリ:</span>
            <Link to={`/categories/${article.category.slug}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80">
                {article.category.emoji && (
                  <span className="mr-1">{article.category.emoji}</span>
                )}
                {article.category.name}
              </Badge>
            </Link>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium mt-1">タグ:</span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link key={tag.id} to={`/tags/${tag.slug}`}>
                  <Badge variant="outline" className="hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {article.techStack && article.techStack.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium mt-1">技術:</span>
            <div className="flex flex-wrap gap-2">
              {article.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 外部リンク */}
      {showExternalLinks &&
        (article.sourceUrl || article.demoUrl || article.externalUrl) && (
          <div className="flex flex-wrap gap-3">
            {article.sourceUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  ソースコード
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            {article.demoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={article.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  デモ
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            {article.externalUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  外部リンク
                </a>
              </Button>
            )}
          </div>
        )}
    </header>
  );
};
