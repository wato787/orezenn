import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToggleLinkRead } from "@/hooks/useLinks";
import type { Link } from "@/types/api";
import { cn } from "@/utils/cn";
import { BookOpen, BookOpenCheck, ExternalLink } from "lucide-react";

interface LinkCardProps {
  link: Link;
  onEdit?: (link: Link) => void;
  className?: string;
}

export const LinkCard = ({ link, onEdit, className }: LinkCardProps) => {
  const toggleRead = useToggleLinkRead();

  const handleToggleRead = () => {
    toggleRead.mutate({ id: link.id, isRead: !link.isRead });
  };

  const handleEdit = () => {
    onEdit?.(link);
  };

  return (
    <Card
      className={cn("transition-all duration-200 hover:shadow-md", className)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-lg font-semibold mb-2",
                link.isRead && "text-gray-500 line-through"
              )}
            >
              {link.description}
            </h3>
          </div>
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleRead}
              disabled={toggleRead.isPending}
              className="h-8 w-8 p-0"
            >
              {link.isRead ? (
                <BookOpenCheck className="w-4 h-4 text-green-600" />
              ) : (
                <BookOpen className="w-4 h-4 text-gray-400" />
              )}
            </Button>
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 truncate block"
            >
              {link.link}
            </a>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>
                追加: {new Date(link.createdAt).toLocaleDateString("ja-JP")}
              </span>
              {link.isRead && <span className="text-green-600">既読</span>}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="ml-2 flex-shrink-0"
          >
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              開く
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
