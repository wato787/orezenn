import type { Article } from "@/types/api";

interface ArticleDebugInfoProps {
  id: string;
  article: Article;
  error?: Error | null;
}

export const ArticleDebugInfo = ({
  id,
  article,
  error,
}: ArticleDebugInfoProps) => {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <details className="bg-gray-100 p-4 rounded">
      <summary className="cursor-pointer font-medium">デバッグ情報</summary>
      <div className="mt-2 space-y-2 text-sm">
        <div>
          <strong>URL ID:</strong> {id}
        </div>
        <div>
          <strong>Article ID:</strong> {article.id}
        </div>
        <div>
          <strong>Article Slug:</strong> {article.slug || "undefined"}
        </div>
        <div>
          <strong>Article Title:</strong> {article.title}
        </div>
        <div>
          <strong>Content Length:</strong> {article.content?.length || 0}
        </div>
        <div>
          <strong>Has Author:</strong> {article.author ? "Yes" : "No"}
        </div>
        <div>
          <strong>Has Category:</strong> {article.category ? "Yes" : "No"}
        </div>
        <div>
          <strong>Tags Count:</strong> {article.tags?.length || 0}
        </div>
        {error && (
          <div className="text-red-600">
            <strong>Error:</strong> {error.message}
          </div>
        )}
        <div>
          <strong>Content Preview:</strong>
        </div>
        <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-32">
          {article.content?.substring(0, 200)}...
        </pre>
      </div>
    </details>
  );
};
