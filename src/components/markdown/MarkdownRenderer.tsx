import { cn } from "@/utils/cn";
import { Check, Copy, ExternalLink, Link } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Zenn/Qiitaライクなデザインの Markdown レンダリングコンポーネント
 */
export const MarkdownRenderer = ({
  content,
  className,
}: MarkdownRendererProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-link"],
              },
            },
          ],
        ]}
        components={{
          // 見出しコンポーネント
          h1: ({ children, ...props }) => (
            <h1
              className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-border flex items-center group"
              {...props}
            >
              <Link className="w-5 h-5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-2xl font-semibold mt-6 mb-3 pb-2 border-border/50 flex items-center group"
              {...props}
            >
              <Link className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-xl font-semibold mt-5 mb-3 flex items-center group"
              {...props}
            >
              <Link className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="text-lg font-semibold mt-4 mb-2 flex items-center group"
              {...props}
            >
              <Link className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {children}
            </h4>
          ),

          // リンクコンポーネント
          a: ({ children, href, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors inline-flex items-center gap-1"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
                {isExternal && <ExternalLink className="w-3 h-3" />}
              </a>
            );
          },

          // コードブロックコンポーネント
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "";
            const codeText = String(children).replace(/\n$/, "");

            if (match) {
              return (
                <div className="relative group my-4">
                  <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border-b">
                    <span className="text-sm font-medium text-muted-foreground">
                      {language}
                    </span>
                    <button
                      onClick={() => copyToClipboard(codeText)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-background border rounded hover:bg-muted transition-colors"
                      title="コードをコピー"
                    >
                      {copiedCode === codeText ? (
                        <>
                          <Check className="w-3 h-3" />
                          コピー済み
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          コピー
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto m-0">
                    <code className="text-sm font-mono">{codeText}</code>
                  </pre>
                </div>
              );
            }

            // インラインコード
            return (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border"
                {...props}
              >
                {children}
              </code>
            );
          },

          // 引用コンポーネント
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/30 pl-4 py-2 bg-muted/50 rounded-r my-4 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),

          // テーブルコンポーネント
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full border border-border rounded-lg overflow-hidden"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-3 text-left font-semibold border-b border-border"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 border-b border-border/50" {...props}>
              {children}
            </td>
          ),

          // リストコンポーネント
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-1 my-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-1 my-4" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),

          // 段落コンポーネント
          p: ({ children, ...props }) => (
            <p className="leading-relaxed my-4" {...props}>
              {children}
            </p>
          ),

          // 画像コンポーネント
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg shadow-sm mx-auto my-4"
              loading="lazy"
              {...props}
            />
          ),

          // 水平線コンポーネント
          hr: ({ ...props }) => (
            <hr className="my-8 border-border" {...props} />
          ),

          // チェックボックスコンポーネント（GitHub Flavored Markdown）
          input: ({ type, checked, ...props }) => {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2 rounded border-border"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
