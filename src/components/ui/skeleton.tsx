import { cn } from "@/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * スケルトンの形状
   */
  variant?: "text" | "circle" | "rect" | "rounded";
  /**
   * サイズ
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 幅（CSS値またはクラス名）
   */
  width?: string;
  /**
   * 高さ（CSS値またはクラス名）
   */
  height?: string;
}

/**
 * 基本Skeletonコンポーネント
 * 再利用可能なローディングプレースホルダー
 */
export const Skeleton = ({
  variant = "rect",
  size = "md",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const variantClasses = {
    text: "rounded",
    circle: "rounded-full aspect-square",
    rect: "rounded-none",
    rounded: "rounded-lg",
  };

  const sizeClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-6",
    xl: "h-8",
  };

  const baseClasses = "bg-muted animate-pulse";
  const widthClass = width || (variant === "circle" ? "w-10" : "w-full");
  const heightClass =
    height || (variant === "text" ? sizeClasses[size] : "h-20");

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        !width && widthClass,
        !height && heightClass,
        className
      )}
      style={{
        ...style,
        ...(width && { width }),
        ...(height && { height }),
      }}
      aria-hidden="true"
      {...props}
    />
  );
};

/**
 * テキスト用Skeletonコンポーネント
 */
export const SkeletonText = ({
  lines = 1,
  className,
  ...props
}: {
  lines?: number;
  className?: string;
} & Omit<SkeletonProps, "variant">) => {
  if (lines === 1) {
    return <Skeleton variant="text" className={className} {...props} />;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? "75%" : "100%"}
          {...props}
        />
      ))}
    </div>
  );
};

/**
 * アバター用Skeletonコンポーネント
 */
export const SkeletonAvatar = ({
  size = "md",
  className,
  ...props
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<SkeletonProps, "variant">) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <Skeleton
      variant="circle"
      className={cn(sizeMap[size], className)}
      {...props}
    />
  );
};
