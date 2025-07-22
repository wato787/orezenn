import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types/api";
import { Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleTitleProps {
  article: Article;
}

export const ArticleTitle = ({ article }: ArticleTitleProps) => {
  return (
    <div className="space-y-6 py-8">
      {/* カテゴリ */}
      {article.category && (
        <div className="flex items-center gap-2">
          <Link to={`/categories/${article.category.id}`}>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {article.category.name}
            </Badge>
          </Link>
        </div>
      )}

      {/* タイトル */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {article.emoji && (
            <span className="mr-4 text-5xl md:text-6xl">{article.emoji}</span>
          )}
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* タグ・技術スタック */}
      <div className="flex flex-wrap gap-3">
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link key={tag.id} to={`/tags/${tag.id}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {article.techStack && article.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
