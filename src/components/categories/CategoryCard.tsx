import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/api";
import { cn } from "@/utils/cn";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "compact";
  className?: string;
  articleCount?: number;
}

export const CategoryCard = ({
  category,
  variant = "default",
  className,
  articleCount,
}: CategoryCardProps) => {
  const { name } = category;

  if (variant === "compact") {
    return (
      <Link to={`/categories/${category.id}`}>
        <Card
          className={cn(
            "group hover:shadow-md transition-all duration-300 cursor-pointer h-full border-border/50 hover:border-border",
            "bg-card hover:bg-accent/5",
            className
          )}
        >
          <CardContent className="p-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm truncate text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              {articleCount !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <FileText className="h-3 w-3" />
                  <span>{articleCount}件</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/categories/${category.id}`}>
      <Card
        className={cn(
          "group hover:shadow-lg transition-all duration-300 cursor-pointer h-full",
          "border-border/50 hover:border-primary/20 bg-card hover:bg-accent/5",
          "transform hover:-translate-y-0.5",
          className
        )}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center space-y-2">
            {/* カテゴリ名 */}
            <div className="space-y-1">
              <h3 className="font-medium text-base text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>

              {/* 記事数 */}
              {articleCount !== undefined && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  <span>{articleCount}件</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
