import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

export const SearchBox = ({
  onSearch,
  placeholder = "記事を検索...",
  className,
  ref,
}: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // デバウンス処理（500ms）
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-9 text-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          ref={ref}
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
