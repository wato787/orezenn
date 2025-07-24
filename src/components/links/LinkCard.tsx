import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToggleLinkRead } from "@/hooks/useLinks";
import type { Link } from "@/types/api";
import { cn } from "@/utils/cn";
import { ExternalLink } from "lucide-react";

interface LinkCardProps {
  link: Link;
  className?: string;
}

export const LinkCard = ({ link, className }: LinkCardProps) => {
  const toggleRead = useToggleLinkRead();

  const handleToggleRead = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
    }
    toggleRead.mutate({ id: link.id, isRead: !link.isRead });
    if (e.target instanceof HTMLAnchorElement) {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Card
      className={cn("transition-all duration-200 hover:shadow-md", className)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{link.description}</p>
          <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 truncate block"
            onClick={handleToggleRead}
          >
            {link.link}
          </a>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="ml-2 flex-shrink-0"
            onClick={handleToggleRead}
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
