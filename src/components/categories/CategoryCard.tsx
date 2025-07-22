import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@/types/api";
import { cn } from "@/utils/cn";
import { FolderOpen } from "lucide-react";
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
            "hover:shadow-md transition-shadow cursor-pointer h-full",
            className
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm truncate">{name}</h3>
                {articleCount !== undefined && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {articleCount}件の記事
                  </p>
                )}
              </div>
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
          "hover:shadow-md transition-shadow cursor-pointer h-full",
          className
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg truncate">{name}</CardTitle>
              {articleCount !== undefined && (
                <p className="text-sm text-muted-foreground mt-1">
                  {articleCount}件の記事
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
