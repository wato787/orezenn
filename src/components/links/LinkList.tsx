import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLinks } from "@/hooks/useLinks";
import type { Link, LinkSearchParams } from "@/types/api";
import { cn } from "@/utils/cn";
import { BookOpen, BookOpenCheck, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LinkCard } from "./LinkCard";
import { LinkForm } from "./LinkForm";

interface LinkListProps {
  className?: string;
}

export const LinkList = ({ className }: LinkListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [editingLink, setEditingLink] = useState<Link | undefined>();

  // 検索パラメータを構築
  const searchParams: LinkSearchParams = useMemo(() => {
    const params: LinkSearchParams = {
      orders: "-createdAt", // 作成日時降順
      limit: 50,
    };

    if (searchQuery.trim()) {
      params.q = searchQuery.trim();
    }

    if (readFilter !== "all") {
      params.isRead = readFilter === "read";
    }

    return params;
  }, [searchQuery, readFilter]);

  const { data: linksData, isLoading, error, refetch } = useLinks(searchParams);

  // 統計情報
  const stats = useMemo(() => {
    if (!linksData?.contents) return { total: 0, read: 0, unread: 0 };

    const total = linksData.contents.length;
    const read = linksData.contents.filter((link) => link.isRead).length;
    const unread = total - read;

    return { total, read, unread };
  }, [linksData?.contents]);

  const handleFormSuccess = () => {
    setEditingLink(undefined);
    refetch();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setReadFilter("all");
  };

  const hasActiveFilters = searchQuery || readFilter !== "all";

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">リンクの取得に失敗しました</p>
        <Button onClick={() => refetch()}>再試行</Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 登録フォーム */}
      <LinkForm link={editingLink} onSuccess={handleFormSuccess} />

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-600">総数</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stats.read}</div>
          <div className="text-sm text-green-600">既読</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {stats.unread}
          </div>
          <div className="text-sm text-orange-600">未読</div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="説明で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* フィルター */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">フィルター:</span>
          </div>

          {/* 既読状態フィルター */}
          <div className="flex gap-1">
            <Button
              variant={readFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setReadFilter("all")}
              className="text-xs"
            >
              すべて
            </Button>
            <Button
              variant={readFilter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setReadFilter("unread")}
              className="text-xs flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              未読
            </Button>
            <Button
              variant={readFilter === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => setReadFilter("read")}
              className="text-xs flex items-center gap-1"
            >
              <BookOpenCheck className="w-3 h-3" />
              既読
            </Button>
          </div>

          {/* フィルタークリア */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500"
            >
              クリア
            </Button>
          )}
        </div>
      </div>

      {/* リンク一覧 */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      ) : linksData?.contents && linksData.contents.length > 0 ? (
        <div className="grid gap-4">
          {linksData.contents.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {hasActiveFilters
              ? "条件に一致するリンクがありません"
              : "まだリンクがありません"}
          </h3>
          <p className="text-gray-600 mb-4">
            {hasActiveFilters
              ? "検索条件を変更してみてください"
              : "気になる記事のリンクを追加してみましょう"}
          </p>
        </div>
      )}
    </div>
  );
};
