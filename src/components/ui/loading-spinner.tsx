import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  /**
   * スピナーのサイズ
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * 表示テキスト
   */
  text?: string;
  /**
   * テキストの位置
   */
  textPosition?: "right" | "bottom";
  /**
   * 全画面表示
   */
  fullscreen?: boolean;
  /**
   * CSSクラス
   */
  className?: string;
}

/**
 * ローディングスピナーコンポーネント
 */
export const LoadingSpinner = ({
  size = "md",
  text,
  textPosition = "right",
  fullscreen = false,
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const spinner = (
    <Loader2
      className={cn("animate-spin text-muted-foreground", sizeClasses[size])}
    />
  );

  const content = (
    <div
      className={cn(
        "flex items-center gap-2",
        textPosition === "bottom" && "flex-col",
        className
      )}
    >
      {spinner}
      {text && (
        <span
          className={cn(
            "text-muted-foreground",
            textSizeClasses[size],
            textPosition === "bottom" && "mt-1"
          )}
        >
          {text}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

/**
 * インライン用の小さなスピナー
 */
export const InlineSpinner = ({
  className,
  ...props
}: Omit<LoadingSpinnerProps, "fullscreen" | "textPosition">) => (
  <LoadingSpinner
    size="xs"
    className={cn("inline-flex", className)}
    {...props}
  />
);

/**
 * ページ全体のローディングスピナー
 */
export const PageLoadingSpinner = ({
  text = "読み込み中...",
  ...props
}: Omit<LoadingSpinnerProps, "fullscreen">) => (
  <LoadingSpinner
    size="lg"
    text={text}
    textPosition="bottom"
    fullscreen
    {...props}
  />
);

/**
 * セクション用のローディングスピナー
 */
export const SectionLoadingSpinner = ({
  text = "読み込み中...",
  className,
  ...props
}: Omit<LoadingSpinnerProps, "fullscreen">) => (
  <div className={cn("flex items-center justify-center py-8", className)}>
    <LoadingSpinner size="md" text={text} textPosition="right" {...props} />
  </div>
);
