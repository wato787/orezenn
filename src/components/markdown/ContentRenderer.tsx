import styles from "./ContentRenderer.module.css";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ContentRendererProps {
  content: string;
  className?: string;
}

/**
 * コンテンツ形式を判定して適切にレンダリングするコンポーネント
 */
export const ContentRenderer = ({
  content,
  className,
}: ContentRendererProps) => {
  // HTMLタグが含まれているかを判定
  const isHTML = /<[^>]*>/g.test(content);

  if (isHTML) {
    // HTML形式の場合（microCMSのリッチエディタから返されるHTML）
    return (
      <div
        className={`${styles.htmlContent} ${className || ""}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Markdown形式の場合
  return <MarkdownRenderer content={content} className={className} />;
};
