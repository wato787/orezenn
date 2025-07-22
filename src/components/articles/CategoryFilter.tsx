import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface CategoryFilterProps {
  className?: string;
}

export const CategoryFilter = ({ className }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: categoriesResponse, isPending } = useCategories();
  const categories = categoriesResponse?.contents || [];

  // 外側クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <span>カテゴリ</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            {isPending ? (
              <div className="text-sm text-muted-foreground p-2">
                カテゴリを読み込み中...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">
                カテゴリがありません
              </div>
            ) : (
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
