interface ArticleListHeaderProps {
  totalCount?: number;
  currentPage: number;
  pageSize: number;
  isPending: boolean;
}

export const ArticleListHeader = ({
  totalCount,
  currentPage,
  pageSize,
  isPending,
}: ArticleListHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      {/* ヘッダー */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">記事一覧</h1>
        <p className="text-muted-foreground">
          {totalCount !== undefined
            ? `${totalCount} 件の記事があります`
            : "技術記事・ナレッジを探索しよう"}
        </p>
      </div>

      {/* 表示情報 */}
      {totalCount !== undefined && !isPending && (
        <div className="text-sm text-muted-foreground">
          {totalCount} 件中{" "}
          {Math.min(totalCount, (currentPage - 1) * pageSize + 1)} -{" "}
          {Math.min(totalCount, currentPage * pageSize)} 件を表示
        </div>
      )}
    </div>
  );
};
