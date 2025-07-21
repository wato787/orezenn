import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

/**
 * 日付文字列を日本語形式でフォーマットする
 * @param dateString ISO形式の日付文字列
 * @returns "2024年1月15日" 形式の文字列
 */
export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年M月d日", { locale: ja });
};

/**
 * 日付文字列を短縮形式でフォーマットする
 * @param dateString ISO形式の日付文字列
 * @returns "2024/01/15" 形式の文字列
 */
export const formatDateShort = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy/MM/dd");
};

/**
 * 相対時間を表示する（例：2日前、1週間前）
 * @param dateString ISO形式の日付文字列
 * @returns 相対時間の文字列
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "今日";
  if (diffInDays === 1) return "昨日";
  if (diffInDays < 7) return `${diffInDays}日前`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}週間前`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}ヶ月前`;
  return `${Math.floor(diffInDays / 365)}年前`;
};
