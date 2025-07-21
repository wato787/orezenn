import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合してTailwind CSSの競合を解決するユーティリティ関数
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
